import react, {Fragment, useEffect, useState} from 'react';
import {GiTrophyCup} from 'react-icons/gi';
import Modal from '../Modal'
import React from 'react';
import axios, { Axios } from 'axios'


const QuizOver = React.forwardRef(({levelNames,score, maxQuestions, quizLevel, loadLevelQuestions}, ref) => {

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [charactersInfos, setCharactersInfos] = useState();
    const [loading, setLoading] = useState(true);
    const scorePercent = () => (score / maxQuestions) *100
    const percent = scorePercent()
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const hash= 'b26ce82c9b1248e02b4390cc91ad75df';

    useEffect(() => {
        setAsked(ref.current)
        if(localStorage.getItem('marvelStorageDate')){
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date);
        }
    }, [ref]);

    const checkDataAge = date => {
        const today = Date.now();
        const timeDifference = today - date;

        const daysDifference = timeDifference / (1000*3600*24)// conversion de la date (mili seconde => jour)
    
        if(daysDifference >= 5){
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now())
        }
    }

    const averageGrade = () =>  score >= (maxQuestions / 2) ;

    const showModal= id => {
        setOpenModal(true);

        if(localStorage.getItem(id)){
            setCharactersInfos(JSON.parse(localStorage.getItem(id)))
            setLoading(false)
        }else{
            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then(response => {
                console.log(response.data);
                setCharactersInfos(response.data)
                setLoading(false)

                localStorage.setItem(id, JSON.stringify(response.data))
                if(!localStorage.getItem('marvelStorageDate')){
                    localStorage.setItem('marvelStorageDate', Date.now())
                }
            })
            .catch(error => {
                console.log(error);
            } )
        }
    }

    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }
//  DECISION METHOD (IF WIN OR LOOSE)
    const decision = averageGrade() ? (
        <Fragment>
            <div className='stepsBtnContainer'>
                {
                    quizLevel < levelNames.length? (
                        <Fragment>
                            <p className='successMsg'>Bravo , Passez au niveau suivant!</p>
                            <button
                             className='btnResult success'
                             onClick={() => loadLevelQuestions(quizLevel)}
                            >Niveau suivant</button>
                        </Fragment>
                    )
                    :
                    (
                        <Fragment>
                            <p className='successMsg'> <GiTrophyCup size='50px'/>Bravo , vous êtes un expert !</p>
                            <button
                             className='btnResult gameOver'
                             onClick={() => loadLevelQuestions(0)}>Acceuil</button>
                        </Fragment>
                    )
                }
             </div>
             <div className='percentage'>
                    <div className='progressPercent'>Reussite: {percent}%</div>
                    <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )
    :
    (
        <Fragment>
            <div className='stepsBtnContainer'>
                <p className='successMsg'>Vous avez echoué !</p>
                <button
                    className='btnResult success'
                    onClick={() => loadLevelQuestions(quizLevel)}
                >Recommencer le niveau</button>
            </div>
            <div className='percentage'>
                    <div className='progressPercent'>Reussite: {percent}%</div>
                    <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

//QUESTION ANSWER METHOD (QUESTION DISPLAY WITH OR NOT RESPONSES)   
    const questionAnswer = averageGrade() ?(
        asked.map((question)=> 
        <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td><button className='btnInfo'
            onClick={() => showModal(question.heroId)}
            >Infos</button></td>
        </tr>
        )
    )
    :
    (
        asked.map((question)=> 
        <tr key={question.id}>
            <td colSpan="3">{question.question}</td>
        </tr>   
        )
    )
//Modal function
    const  resultModal =
        !loading ? (
            <Fragment>
                <div className="modalHeader">
                    <h2>{charactersInfos.data.results[0].name}</h2>
                </div>
                <div className="modalBody">
                    <div className='comicImage'>
                        <img src={charactersInfos.data.results[0].thumbnail.path + '.' + charactersInfos.data.results[0].thumbnail.extension}   alt={charactersInfos.data.results[0].name}/>
                        <p>{charactersInfos.attributionText}</p>
                    </div>
                    <div className='comicDetails'>
                        <h3>Description</h3>
                        {charactersInfos.data.results[0].description ?
                        (
                            <p>{charactersInfos.data.results[0].description}</p>
                        )
                        :
                        (
                            <p>Description indisponible....</p>
                        )
                        }
                        <h3>Plus d'infos</h3>
                        {
                            charactersInfos.data.results[0].urls &&
                            charactersInfos.data.results[0].urls.map((url, index) => {
                                return <a 
                                    key={index} 
                                    href={url.url}
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >{url.type}</a>
                            })
                        }
                        
                    </div>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn" onClick={hideModal}>Fermer</button>
                </div>
            </Fragment>
        )
        :
        (
            <Fragment>
                <div className="modalHeader">
                    <h2>Chargement</h2>
                </div>
                <div className="modalBody">
                     <div className='loader'></div>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn" onClick={hideModal}>Fermer</button>
                </div>
            </Fragment>
        )
    ;
    return(
        <Fragment>

            {decision}

            <hr/>
            {averageGrade() ? <p>Les réponses aux questions posées:</p> : <p>Voici les questions posées:</p>}

            <div className='answerContainer'>
                <table className='answers'> 
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal}>
                {resultModal}
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver);
