import React from 'react'
import Layout from '../layouts/Layout'
import Header from '../components/Header/Header'
import About from '../components/About/About'
import Faq from '../components/Faq/Faq'
import Map from '../components/Map/Map'

const Home = () => {
  return (
    <div>
      <Layout>
        <Header></Header>
        <About></About>
        <Faq></Faq>
        <Map></Map>
      </Layout>
    </div>
  )
}

export default Home
