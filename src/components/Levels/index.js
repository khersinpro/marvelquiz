import React, {useEffect, useState} from 'react';
import Stepper from 'react-stepper-horizontal/lib/Stepper';

const Levels = ({levelNames, quizLevel}) => {

    const [stepArray, setStepArray] = useState([]);

    useEffect(() => {
      const stepLevel = levelNames.map(level => ({title: level.toUpperCase()}));
      setStepArray(stepLevel)
    }, [levelNames]);
    
    return (
        <div className='levelsContainer' style={{background: "transparent"}}>
            <Stepper steps={stepArray} 
            activeStep={ quizLevel }
            circleTop={0}
            activeTitleColor={"#d31017"}
            activeColor={'#d31017'}
            completeColor={'#d31017'}
            completeTitleColor={'#d31017'}
            completeBarColor={'#d31017'}
            size={45}
            circleFontSize={18}
             /> 
        </div>
    )
};

export default React.memo(Levels);
