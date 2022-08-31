import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'
const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState();

  const addressSubmittedHandler = (address: string) => {
    try{
      const key = new Web3.PublicKey(address)  
    setAddress(key.toBase58())
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    connection.getBalance(key).then(balance =>{
      setBalance(balance / Web3.LAMPORTS_PER_SOL)
    })
    connection.getAccountInfo(key).then(info => {
      setIsExecutable(info?.executable ?? false);
    })
    }catch(error){
      setAddress('')
      setBalance(0)
      alert(error)
    } 
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p className={styles.Para}>{`Address: ${address}`}</p>
        <p className={styles.Para}> {`Balance: ${balance} SOL`}</p>
        <p className={styles.Para}> {`Is it executable ?: ${isExecutable ? 'Yes' : 'No'}`}</p>
      </header>
    </div>
  )
}

export default Home
