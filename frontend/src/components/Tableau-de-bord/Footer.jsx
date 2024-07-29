
export default function Footer() {
    
    return (
        <div style={{padding: "12px 0px", backgroundColor : "#FFFF", textAlign: 'center', width: '100%',height : '85px', bottom : '0', left: '0', right: '0', zIndex : '999'}}>
            
            <div className="text-center">
                    <h5>
                         <a href="www.linkedin.com/in/nesrine-ben-refifa-26aa511b3/" style={{textDecoration : "none", color: "red"}}>LAB-IT Sousse</a>
                    </h5>
            </div>  

            <div className="text-center pt-1">
                <a href="https://www.linkedin.com/in/nesrine-ben-refifa-26aa511b3/" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin mx-2" style={{fontSize : "20px"}}></i>
                </a>
                
                <a href="http://lab-it.tn/" target="_blank" rel="noreferrer">
                    <i className="bi bi-globe mx-2" style={{fontSize : "20px"}}></i>
                </a>

                <a href="https://github.com/nesrinebenrefifa" target="_blank" rel="noreferrer">
                    <i className="bi bi-github mx-2" style={{fontSize : "21px"}}></i>
                </a>

                <a href="mailto:benrefifanesrine@gmail.com" target="_blank" rel="noreferrer">
                    <i className="bi bi-envelope-fill mx-2" style={{fontSize : "21px"}}></i>
                </a>
            </div>
            
        </div>
       
    )
}
