import React from "react";
import { Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaQuoteLeft} from 'react-icons/fa';


let colors = [
  '#7A0BC0',
  '#270082',
  '#6867AC',
  '#A267AC',
  '#CE7BB0',
  '#6E3CBC',
  '#7267CB',
  '#98BAE7',
  '#94B5C0',
  '#350B40',
  '#AD6C80',
  '#EE99A0',
  '#686D76',
  '#19D3DA',
  '#A267AC',
  '#CE7BB0',
  '#FFBCD1',
  '#6867AC'
];

export const GetQuote = () => {
  const random = colors[Math.floor(Math.random() * colors.length)];
  const [quote, setQuote] = React.useState(null);
  const [color, setColor] = React.useState('blue');

let newQuote = (quote) => {
setQuote(quote);
setColor(random);
document.body.style.backgroundColor = random;
}
  async function getQuotes() {
    try {
      const response = await fetch(
        "https://api.quotable.io/random?maxLength=100"
      );
      const { status, message, ...data } = await response.json();
      if (!response.ok) throw new Error(`${status}${message}`);
      newQuote(data);
    } catch (error) {
      setQuote({ content: "Something went wrong, try again" });
    }
  }

  React.useEffect(() => {
  getQuotes();
  },[]);

  if (!quote) return null;
  return (
  
    <Container fluid id="quote-box"  style={{borderColor: color}} >
      <FaQuoteLeft style ={{color: color}}/><Row id="text"  style={{color: color}}>{quote.content}</Row>
      <Row id="author"  style={{color: color}}>~{quote.author}</Row>
      <div id="new-quote">
         <Button
          style={{backgroundColor: color, color:'white', borderColor: color}}
          type="button" class="btn btn-outline"
          onClick={() => getQuotes()}
        > 
        
          Get a quote
        </Button>
        </div>

    </Container>
   
  );
};
