export default function Card(props) {
    return (
        <div className={ props.class } style={{ boxShadow: "0px 20px 40px -30px lightgrey",  background: 'linear-gradient(to top, #F6F6F6 0%, #ffffff 100%)'}}>
            <h2>{ props.title }</h2>
            <p>{ props.body }</p>
            <img src={ props.img } alt=""/>       
        </div>
    );
}