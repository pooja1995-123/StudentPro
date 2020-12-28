import React from "react";
import axois from "axios";
import team from "./image.png";

class Inputstudent extends React.Component{
    state={
        firstname:"",
        lastname:"",
        place:""
    }
    handleChange=(e)=>{
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=()=>{
        if(this.state.firstname!="" && this.state.lastname!="",this.state.place!="")
        {
            axois.post("http://localhost:5000/students",this.state)
            .then((res)=>{
                console.log("successfully posted");
                this.setState({firstname:"",lastname:"",place:""})
                
            });
            window.location="/";
        }
    }
    render(){
        return(<React.Fragment>
            <div className="row text-center">
                <div className="col-md-4">
                    <form onSubmit={()=>{this.handleSubmit()}}>
                        <input required placeholder="First Name" className="form-control" value={this.state.firstname} name="firstname"onChange={(e)=>{this.handleChange(e)}}
                        style={{borderRadius:"10px",marginLeft:"50px",marginTop:"20px"}} />
                        <input required placeholder="Last Name"className="form-control" value={this.state.lastname} name="lastname" onChange={(e)=>{this.handleChange(e)}}
                        style={{borderRadius:"10px",marginLeft:"50px",marginTop:"20px"}}/>
                        <input required placeholder="Place"className="form-control" value={this.state.place} name="place" onChange={(e)=>{this.handleChange(e)}}
                        style={{borderRadius:"10px",marginLeft:"50px",marginTop:"20px"}}/>
                        <button style={{borderRadius:"10px",color:"white",backgroundColor:"#000066",width:"490px",marginLeft:"50px",marginTop:"20px"}}className="btn">Create</button>
                    </form>
                    </div>
                    <div className="col-md-8">
                        <img style={{height:"350px",width:"550px"}} src={team}/>

                    </div>

                
            </div>
        </React.Fragment>)
    }
}

export default Inputstudent