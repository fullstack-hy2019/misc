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

Kun sovellus renderäidään ensimmäistä kertaa, tulostuu _hello 0 0_. Sen jälkeen jokainen näppäimen painallus aiheuttaa uuden renderöinnin ja efektifunktion suorittamisen.

```js 
useEffect(() => {
  console.log('hello', x, y)
}, [])
```

```js 
useEffect(() => {
  console.log('hello', x, y)
}, [])
```

### 6. Javascriptilla ohjelmoidessa käytetään usein asynkronisia funktioita. Kerro mistä on kyse ja miten asynkroonisuus useimmiten hoidetaan.

### 7. Mitä ovat Expressissä usein käytetyt request- ja response-oliot? Mihin niitä käytetään?

### 8. Expressin yhteydessä puhutaan usein middlewareista. Kerro mitä ne ovat ja mihin niitä käytetään


