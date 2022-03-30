import React, {Component, Fragment} from 'react';
import { toast } from 'react-toastify';
import QuizOver from '../QuizOver';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../QuizMarvel';
import { FaChevronRight } from "react-icons/fa";


toast.configure()

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
    }
    this.state = this.initialState

    this.storedDataRef = React.createRef()

  }
    
  loadLevelQuestions= (param) => {
    this.setState({...this.initialState, quizLevel: param})
    this.loadQuestions(this.state.levelNames[param])
  }

  loadQuestions = level => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]

    if(fetchedArrayQuiz.length >= this.state.maxQuestions){

      this.storedDataRef.current = fetchedArrayQuiz

      //destructuring qui permet de retirer answer et garder le reste des elements du tableau (...keepRest)
      const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest);
     
      this.setState({
        storedQuestions: newArray
      })  
    }else{
      console.log("pas assez de questions");
    }
  }

  showToastMsg = pseudo => {
    if(!this.state.showWelcomeMsg){
      toast.warn(`Bienvenue ${pseudo}!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      bodyClassName: "toastify-color-welcome"
      });
      this.setState({
        showWelcomeMsg: true,
      })
    }

    
  }

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.storedQuestions !== prevState.storedQuestions){
      this.setState({ 
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options ,
      })
    }

    if(this.state.idQuestion !== prevState.idQuestion){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options ,
        userAnswer: null,
        btnDisabled: true,
      })
    }

    if(this.props.userData.pseudo !== prevProps.userData.pseudo){
      this.showToastMsg(this.props.userData.pseudo)
    }
  }

  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    })
  }
  //winrate percent
  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = () => {

    const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score )
    if(gradePercent >= 50){
      this.setState({
        quizLevel: this.state.quizLevel +1,
        quizEnd: true,
      })
    }else{
      this.setState({
        quizEnd: true,
      })
    }
  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions -1){
      this.gameOver()
    }else{
      this.setState( prevState => ({
        idQuestion: prevState.idQuestion +1,
      }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer){
      this.setState( prevState => ({
        score: prevState.score +1,
      }))

      toast.success('Bravo , +1 point !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color-welcome"
        });
    }else{
      toast.error('Raté ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  
  render() {

    const questionsMap = this.state.options.map((option, index) => {
      return <p onClick={() => this.submitAnswer(option)} 
      className={`answerOptions ${this.state.userAnswer === option ? "selected" : "" }`} 
      key={index}><FaChevronRight/>{option}</p>
    })

    return this.state.quizEnd ?(
      <QuizOver 
      ref={this.storedDataRef}
      levelNames={this.state.levelNames}
      score={this.state.score}
      maxQuestions={this.state.maxQuestions}
      quizLevel={this.state.quizLevel}
      loadLevelQuestions={this.loadLevelQuestions}
      />
    )
    :
    (
      <Fragment>
        <Levels levelNames={this.state.levelNames} quizLevel={this.state.quizLevel} />
        <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>
        <h2>{this.state.question}</h2>
        {questionsMap}
        <button 
          className='btnSubmit' 
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
        >{this.state.idQuestion < this.state.maxQuestions -1 ? "Suivant" : "Terminer"}</button>
     </Fragment>
    )
    
  }  
    
};

export default Quiz;
