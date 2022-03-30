import React, {Fragment} from 'react';

const ProgressBar = ({idQuestion, maxQuestions}) => {

    const actualQuestion = idQuestion +1;

    const getWidth = (actualQuestion, maxQuestions) =>{
        return (100 / maxQuestions) * actualQuestion
    }

    const progressPercent = getWidth(actualQuestion, maxQuestions)
    return(
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'>Question {idQuestion +1}/{maxQuestions}</div>
                <div className='progressPercent'>Progression: {progressPercent}%</div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange' style={{width: `${progressPercent}%`}}></div>
            </div>   
        </Fragment>
    )
};

export default React.memo(ProgressBar);
//memo evite de recharger les composants inutilement si il n'y a pas de modification apporté
