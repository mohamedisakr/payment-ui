import React, {useState} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import 'animate.css'
import './App.css'
import {pay} from './services/payment'
import {toast} from 'react-toastify'

// import ReactDOM from 'react-dom'
// 'cleave.js/dist/cleave-react.min.js'

const imageUrls = [
  'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
  'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png',
  'https://www.discover.com/company/images/newsroom/media-downloads/discover.png',
  'https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg',
  'https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png',
]

function App() {
  const [creditCard, setCreditCard] = useState('')
  const [cardType, setCardType] = useState('')
  // const [cardHolder, setCardHolder] = useState('Your Full Name')
  // const [expireMonth, setExpireMonth] = useState('MM')
  // const [expireYear, setExpireYear] = useState('YYYY')
  const [expDate, setExpDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState('')

  // const [cardTypeUrl, setCardTypeUrl] = useState(
  //   'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
  // )
  // // const [flip, setFlip] = useState(null);

  /*
  const handleNum = (e) => {
    setCreditCard(e.target.rawValue)
    // console.log(e.target.value);
  }

  const handleType = (type) => {
    setCardType(type)
    console.log(type)

    if (type === 'visa') {
      setCardTypeUrl(imageUrls[0])
      console.log('Visa')
    } else if (type === 'mastercard') {
      setCardTypeUrl(imageUrls[1])
      console.log('Mastercard')
    } else if (type === 'discover') {
      setCardTypeUrl(imageUrls[2])
      console.log('Discover')
    } else if (type === 'amex') {
      setCardTypeUrl(imageUrls[3])
      console.log('Amex')
    } else if (type === 'diners') {
      console.log('Diners')
      setCardTypeUrl(imageUrls[4])
    } else if (type === 'jcb') {
      console.log('JCB')
      setCardTypeUrl(imageUrls[5])
    }
  }

  const handleCardHolder = (e) => {
    setCardHolder(e.target.value)
  }

  const handleExpMonth = (e) => {
    setExpireMonth(e.target.value)
  }

  const handleExpYear = (e) => {
    setExpireYear(e.target.value)
  }
*/
  const handleCreditCardNumChange = (e) => {
    setCreditCard(e.target.value)
  }

  const handleExpDate = (e) => {
    setExpDate(e.target.value)
  }

  const handleCvvChange = (e) => {
    setCvv(e.target.value)
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(
      `payment payload : ${JSON.stringify(
        {creditCard, expDate, cvv, amount},
        null,
        4,
      )}`,
    )
    const paymentToAdd = {
      creditCard,
      expDate,
      cvv,
      amount,
    }

    try {
      const res = await pay(paymentToAdd)
      console.log(`response : ${JSON.stringify(res, null, 4)}`)
      // console.log(JSON.stringify(paymentToAdd, null, 4))

      toast.success('New payment added successfully')
    } catch (err) {
      console.log(`Error : ${JSON.stringify(err, null, 4)}`)
      toast.error(`${err.response.data.message}`)
      // toast.error(`${err}`)

      // if (err.status === 400) {
      //   toast.error(`${err}`)
      //   // toast.error(`${err.message}`)
      // }

      // if (err.response.status === 400) {
      //   toast.error(`${err.response.data.message}`)
      // }
    }
  }

  return (
    <div className="container">
      <pre>{JSON.stringify({creditCard, expDate, cvv, amount}, null, 4)}</pre>
      <form id="form" onSubmit={handleSubmit}>
        {/* <div id="card">
          <div className="header">
            <div className="sticker"></div>
            <div>
              <img className="logo" src={cardTypeUrl} alt="Card logo" />
            </div>
          </div>
          <div className="body">
            <h2 id="creditCardNumber">{creditCardNum}</h2>
          </div>
          <div className="footer">
            <div>
              <h5>Card Holder</h5>
              <h3>{cardHolder}</h3>
            </div>
            <div>
              <h5>Expires</h5>
              <h3>
                {expireMonth} / {expireYear}
              </h3>
            </div>
          </div>
        </div> */}

        <div className="input-container mt">
          <h4>Enter card number</h4>
          <input
            type="text"
            value={creditCard}
            onChange={handleCreditCardNumChange}
            placeholder="#### #### #### ####"
            required
          />
          {/* <Cleave
            delimiter="-"
            options={{
              creditCard: true,
              onCreditCardTypeChanged: handleType,
            }}
            onChange={handleNum}
            placeholder="Please enter your credit card number"
          /> */}
        </div>

        {/* <div className="input-container">
          <h4>Card Holder</h4>
          <input
            onChange={handleCardHolder}
            type="text"
            placeholder="Please enter your full name"
            required
          />
        </div> */}

        <div className="input-grp">
          <div className="input-container">
            <h4>Expiration Date</h4>
            <input
              type="text"
              value={expDate}
              onChange={handleExpDate}
              placeholder="MM/YYYY"
              required
            />
          </div>
          {/* <div className="input-container">
            <h4>Expiration Year</h4>
            <select value={expireYear} onChange={handleExpYear}>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div> */}

          {/* <div className="input-container">
            <h4>Month</h4>
            <select value={expireMonth} onChange={handleExpMonth}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div> */}
          <div className="input-container">
            <h4>CVV</h4>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="###"
              required
            />
          </div>
          <div className="input-container">
            <h4>Amount</h4>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount"
              required
            />
          </div>
        </div>

        <button>{`Submit ${cardType} payment`}</button>
      </form>
    </div>
  )
}

// "creditCard": "378282246310005",
// "expDate": "04/2022",
// "cvv": "3450",
// "amount": 100

App.propTypes = {
  acceptedCards: PropTypes.array,
  callback: PropTypes.func,
  cvv: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expiry: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  focused: PropTypes.string,
  issuer: PropTypes.string,
  locale: PropTypes.shape({
    valid: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholders: PropTypes.shape({
    name: PropTypes.string,
  }),
  preview: PropTypes.bool,
}
export default App

/*
import React from 'react'
import PropTypes from 'prop-types'
import Payment from 'payment'

const App = (props) => {
  const issuer = () => {
    const {issuer, preview} = props

    return preview && issuer ? issuer.toLowerCase() : this.options.issuer
  }

  const number = () => {
    const {number, preview} = props

    let maxLength = preview ? 19 : this.options.maxLength
    let nextNumber =
      typeof number === 'number'
        ? number.toString()
        : number.replace(/[A-Za-z]| /g, '')

    if (isNaN(parseInt(nextNumber, 10)) && !preview) {
      nextNumber = ''
    }

    if (maxLength > 16) {
      maxLength = nextNumber.length <= 16 ? 16 : maxLength
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength)
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•'
    }

    if (['amex', 'dinersclub'].includes(this.issuer)) {
      const format = [0, 4, 10]
      const limit = [4, 6, 5]
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0],
      )} ${nextNumber.substr(format[1], limit[1])} ${nextNumber.substr(
        format[2],
        limit[2],
      )}`
    } else if (nextNumber.length > 16) {
      const format = [0, 4, 8, 12]
      const limit = [4, 7]
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0],
      )} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(
        format[2],
        limit[0],
      )} ${nextNumber.substr(format[3], limit[1])}`
    } else {
      for (let i = 1; i < maxLength / 4; i++) {
        const space_index = i * 4 + (i - 1)
        nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(
          space_index,
        )}`
      }
    }

    return nextNumber
  }

  const expiry = () => {
    const {expiry = ''} = props
    const date = typeof expiry === 'number' ? expiry.toString() : expiry
    let month = ''
    let year = ''

    if (date.includes('/')) {
      ;[month, year] = date.split('/')
    } else if (date.length) {
      month = date.substr(0, 2)
      year = date.substr(2, 6)
    }

    while (month.length < 2) {
      month += '•'
    }

    if (year.length > 2) {
      year = year.substr(2, 4)
    }

    while (year.length < 2) {
      year += '•'
    }

    return `${month}/${year}`
  }

  const options = () => {
    const {number} = props
    const issuer = Payment.fns.cardType(number) || 'unknown'

    let maxLength = 16

    if (issuer === 'amex') {
      maxLength = 15
    } else if (issuer === 'dinersclub') {
      maxLength = 14
    } else if (['hipercard', 'mastercard', 'visa'].includes(issuer)) {
      maxLength = 19
    }

    return {
      issuer,
      maxLength,
    }
  }

  const setCards = () => {
    const {acceptedCards} = props
    let newCardArray = []

    if (acceptedCards.length) {
      Payment.getCardArray().forEach((d) => {
        if (acceptedCards.includes(d.type)) {
          newCardArray.push(d)
        }
      })
    } else {
      newCardArray = newCardArray.concat(Payment.getCardArray())
    }

    Payment.setCardArray(newCardArray)
  }

  const {cvc, focused, locale, name, placeholders} = props
  // const {number, expiry} = this

  return (
    <div key="Cards" className="rccs">
      <div
        className={[
          'rccs__card',
          `rccs__card--${this.issuer}`,
          focused === 'cvc' && this.issuer !== 'amex'
            ? 'rccs__card--flipped'
            : '',
        ]
          .join(' ')
          .trim()}
      >
        <div className="rccs__card--front">
          <div className="rccs__card__background" />
          <div className="rccs__issuer" />
          <div
            className={[
              'rccs__cvc__front',
              focused === 'cvc' ? 'rccs--focused' : '',
            ]
              .join(' ')
              .trim()}
          >
            {cvc}
          </div>
          <div
            className={[
              'rccs__number',
              number.replace(/ /g, '').length > 16 ? 'rccs__number--large' : '',
              focused === 'number' ? 'rccs--focused' : '',
              number.substr(0, 1) !== '•' ? 'rccs--filled' : '',
            ]
              .join(' ')
              .trim()}
          >
            {number}
          </div>
          <div
            className={[
              'rccs__name',
              focused === 'name' ? 'rccs--focused' : '',
              name ? 'rccs--filled' : '',
            ]
              .join(' ')
              .trim()}
          >
            {name || placeholders.name}
          </div>
          <div
            className={[
              'rccs__expiry',
              focused === 'expiry' ? 'rccs--focused' : '',
              expiry.substr(0, 1) !== '•' ? 'rccs--filled' : '',
            ]
              .join(' ')
              .trim()}
          >
            <div className="rccs__expiry__valid">{locale.valid}</div>
            <div className="rccs__expiry__value">{expiry}</div>
          </div>
          <div className="rccs__chip" />
        </div>
        <div className="rccs__card--back">
          <div className="rccs__card__background" />
          <div className="rccs__stripe" />
          <div className="rccs__signature" />
          <div
            className={['rccs__cvc', focused === 'cvc' ? 'rccs--focused' : '']
              .join(' ')
              .trim()}
          >
            {cvc}
          </div>
          <div className="rccs__issuer" />
        </div>
      </div>
    </div>
  )
}

export default App
*/
/*

*/
