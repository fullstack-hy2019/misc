# Full stack -koe

## statistiikkaa

<pre>
  Ilmoittautuneita: 192
  Osallistuneita:   173
  Hyväksyttyjä:     115 ( 66% osallistuneista )	   
  Hylättyjä:        58
</pre>

<pre>
Arvosanajakauma
   5 : 67  ************************************************************...
   4 : 17  *****************
   3 : 11  ***********
   2 : 12  ************
   1 : 8   ********
</pre>

## esimerkkivastauksia

### 1 Mitä tarkoitetaan Reactissa komponentilla? Miten komponentti määritellään?  

Komponentti on koodin perusyksikkö, jonka vastuulla on useimmiten tuottaa osa sivun näkymää eli virtual domia. Komponentit määriteltiin kurssilla JSX:ä palauttavina Javascript-funktioina.

### 2 Miten React-komponentti voi siirtää tietoa lapsikomponenteille?

Jos lapsi määritelty seuraavasti

```js 
const Child = (props) => <div>{props.data}</div>
```

voi vanhempi välittää lapselle merkkijonon _propsin_ data avulla seuraavasti:

```js 
<Child data='lapsi renderöi tämän merkkijonon' />
```

### 3 Miten lapsikomponentti voi siirtää tietoa vanhemmalleen?  

Vanhemmassa määritellyn, propsina välitetyn funktion avulla. Esim seuraavassa lapsessa nappia painamalla generoitu satunnaisluku siirretään vanhempaan:

```js 
const Mother = () => {
  const function = (p) => console.log(`olen vanhempi mutta saan dataa lapselta ${p}`)

  return (
    <Child motherFunction={function}>
  )
}
```

```js 
const Child = (props) => {
  const childFunction = () => {
    const randomData = `satunnainen luku ${Math.random()}`
    props.motherFunction(randomData)
  }
  
  return (
    <button onClick={childFunction}>
      paina nappia niin tieto siirtyy
    </button>
  )
}
```

### 4. Kerro miten ns. state hook eli funktio useState toimii. Mihin state hookeja tarvitaan?

State hookeja määrittelemeällä saadaan komponenteille tila, eli _muuttuja_, jonka arvo säilyy useiden komponentin renderöintien yli.

Esim. seuraavassa _useState_-funktiolla luodaan tila, joka talletetaan muuttujaan _x_, tilaa muutetaan funktiolla _setX_:

```js 
const Component = () => {
  const [x, setX] = useState(0)

  return (
    <div>
      <div>{x}</div>
      <button onClick={()=>setX(x + 1)}>
        klik
      </button>
    </div>
  )
}
```

Tilaa muuttavan funktion kutsu saa aikaan komponentin uudelleenrenderöinin.

### 5. Kerro miten ns. effect hook eli funktio useEffect toimii. Mihin effect hookeja tarvitaan?

funktion _useEffect_ avulla voidaan rekisteröidä funktioita jotka suoritetaan oletusarvoisesti sovelluksen jokaisen renderöinnin yhteydessä. 

Oletetaan että meillä on seuraava koodi:

```js 
const Component = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  
  useEffect(() => {
    console.log('hello', x, y)
  })

  return (
    <div>
      x: {x} y: {y}
      <button onClick={()=>setX(x + 1)}>X</button>
      <button onClick={()=>setY(y + 1)}>Y</button>
    </div>
  )
}
```

Kun sovellus renderäidään ensimmäistä kertaa, tulostuu _hello 0 0_. Sen jälkeen jokainen napin painallus aiheuttaa uuden renderöinnin ja efektifunktion suorittamisen. Esim. napin X painaminen kasvattaa x:n arvoa yhdellä, eli efektin suoritus tulostaa konsoliin _hello 1 0_

Efektin suoritusta voidaan rajata funktion _useEffect_ toisen parametrin avulla. Kurssilla annettiin toiseksi parametriksi aina tyhjä taulukko. Tämä saa aikaan sen, että efektifunktio suoritetaan ainoastaan ensimmäisen renderöinnin yhteydessä. Eli jos koodi muuttuu muotoon

```js 
useEffect(() => {
  console.log('hello', x, y)
}, [])
```

tulostuu konsoliin ainoastaan _hello 0 0_ ja efektiä ei suoriteta vaikka jokainen napin painallus aiheuttaa komponentin uudelleenrenderöitymisen.

Muutetaan esimerkin koodi siten, että toisena parametrina on taulukko, jonka sisällä on tilan muuttuja x:

```js 
useEffect(() => {
  console.log('hello', x, y)
}, [x])
```

nyt efekti suoritetaan ensimmäisellä renderöintikerralla ja _aina_ kun x:n arvo muuttuu. Eli nappi X saa aikaan efektifunktion suorituksen, mutta tilan y arvoa muuttava nappi Y _ei_ aiheuta efektin suorittamista.

Efekti suoritetaankin _aina_ kun sen toisena parametrina olevan taulukon sisältö muuttuu.

Kurssilla efektejä käytettiin tekemään HTTP-pyyntöjä sovelluksen App-komponentin renderöityessä ensimmäistä kertaa:


```js 
const App = () => {

  useEffect(() => {
    axios.get('https://dataa.taalta.fi/).then(...)
  }, [])

  // ...
}
```

### 6. Javascriptilla ohjelmoidessa käytetään usein asynkronisia funktioita. Kerro mistä on kyse ja miten asynkroonisuus useimmiten hoidetaan.

Asynkronisella funktiolla tarkoitetaan funktiota, joka käynnistää jonkun operaation, mutta ei pysähdy odottamaan operaation valmistumista. Tälläisiä operaatioita ovat esim. HTTP-pyynnöt ja tietokantaoperaatiot.

Asia voidaan hoitaa Javascritpissa muutamalla eri tavalla. Eräs näistä on promiset ja niille rekisteröitävät käsittelijäfunktiot:

```js 
axios.get('https://dataa.taalta.fi/).then(response => {
  // tänne tullaan kun data on haettu
  const data = response.data
})
// tämä rivi suoritetaan kun datan hakeminen on käynnistetty, mutta ennen kun data on saatu
```

Toinen tapa on async/await:

```js 
const { data } = await axios.get('https://dataa.taalta.fi/)
// tänne tullaan kun data on haettu
```

Koodi näyttää nyt synkrooniselta, eli await-komennon ansiosta suoritus pysähtyy odottamaan että data on haettu. Oikeasti taustalla on asynkroninen operaato mutta async/await-magia saa kaiken näyttämään synkroniselta. 

Komentoa await ei voi käyttää missä vaan, koodin on oltava _async_-funktiossa, esim. seuraavasti:

```js 
const main = async () => {
  const { data } = await axios.get('https://dataa.taalta.fi/')
  console.log('palvelin vastasi', data)
}

// kutsutaanfdunktiota
main()
```

### 7. Mitä ovat Expressissä usein käytetyt request- ja response-oliot? Mihin niitä käytetään?

Expresissä reittien, eli URL- ja HTTP-verbi -yhdistelmälle rekisteröidään käsittelijäfunktio, joka pääsee käsiksi pyyntöön ja vastaukseen parametrinaan saamien request- ja response-olioiden kautta:

```js 
app.post('/books', (request, response) => {
  // request sisältää mm. pyyntöön liittyvät query-parametrit ja datan
  // response:n avulla voidaan määritellä palautettavan vastauksen statuskoodi ja mukana lähetettävä data
})
```

### 8. Expressin yhteydessä puhutaan usein middlewareista. Kerro mitä ne ovat ja mihin niitä käytetään

Jos sovelluksessa on jotain koodia, joka tulisi suorittaa ennen _kaikkia_ tai useampaa reittien käsittelijäfunktiota, on niille oikea paikka middleware. 

Middleware pääsee käsiksi pyynnön request- ja response-olioihin. Middleware voi esim. pysäyttää pyynnön ja vastata siihen  statuskoodilla 401 jos pyynnön tehneellä käyttäjällä ei ole oikeuksia järjestelmään. Pyynnön tehneen käyttäjän middleware voi tarkistaa request-olion mukana olevasta headerista. Middleware saa myös kolmannen parametrin _next_ jonka avulla se siirtää käsittelyn eteenpäin.

Middleware näyttää seuraavalta:

```js 
const middle = (request, response, next) => {
  // täällä voi tehdä mitä vaan olioilla request ja response
  next()
}

app.use(middle)
```
