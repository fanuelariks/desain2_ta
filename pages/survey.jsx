import React from 'react'
import Header from '../components/Header'
import SurveyStudent from '../components/SurveyStudent'
import Statement from '../components/Statement'
import withProtected from '../hoc/withProtected'


const survey = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <div>
            <Header />
        </div>
        <div>
            <Statement />
        </div>
    </div>
  )
}

export default withProtected(survey);