const App = () => {
    const[time,setTime] = React.useState(new Date().toLocaleTimeString());
    const [value,setValue] = React.useState("")
    
      React.useEffect(() => {
    const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    return (
       <Child time={time} value={value} setValue={setValue}/>
    )
}

const Child = ({time,value,setValue}) => {
    
    return (
        <>
        <h1>{time}</h1>
        <input type="text" value={value} placeholder="controlled with react" onChange={(e) => console.log(e.target.value)} />
        <input type="text" value={value} placeholder="controlled with react" onChange={(e) => setValue(e.target.value)} />
        <input type="text" placeholder="Uncontrolled component example"/>
        <input type="text" value="" placeholder="Controlled with value=''  "/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);