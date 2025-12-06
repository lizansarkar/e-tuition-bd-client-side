import React from 'react'
import Hero from './Hero'
import LatestTuitionPosts from './LatestTuitionPosts'
import LatestTutors from './LatestTutors'
import HowWork from './HowWork'
import Features from './Features'

export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <LatestTuitionPosts></LatestTuitionPosts>
        <LatestTutors></LatestTutors>
        <HowWork></HowWork>
        <Features></Features>
    </div>
  )
}
