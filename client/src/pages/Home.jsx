import React from 'react'
import Layout from '../layouts/Layout'
import Header from '../components/Header/Header'
import About from '../components/About/About'
import Faq from '../components/Faq/Faq'
import Map from '../components/Map/Map'
import ScrollToTopButton from '../components/ScrollToTopButton'
import Schedule from '../components/Schedule'
import Rules from '../components/RulesGuidelines/Rules'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
      <Layout>
        <ScrollToTopButton></ScrollToTopButton>
        <Header></Header>
        <About></About>
        <Schedule/>
        <Rules/>
        <Contact/>
        <Map></Map>
      </Layout>
    </div>
  )
}

export default Home
