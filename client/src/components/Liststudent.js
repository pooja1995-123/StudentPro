import React from "react";
import axios from "axios";

class Liststudent extends React.Component{
    state={
        students:[],
        ufirstname:"",
        ulastname:"",
        uplace:"",
        uid:""
        }
    getStudents=()=>{
        axios.get("http://localhost:5000/")
        .then((res)=>{
            console.log(res);
            this.setState({students:res.data});
        })
    }
    componentDidMount=()=>{
        this.getStudents();
    }
    handleDelete=(id)=>{
        axios.delete(`http://localhost:5000/student/${id}`)
        .then((res)=>{
            console.log(res);
            window.location="/";
        })
    }
    handleUpdate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleModalUpdate=(e)=>{
        axios.put(`http://localhost:5000/student/${this.state.uid}`,{firstname:this.state.ufirstname,lastname:this.state.ulastname,place:this.state.uplace})
        .then(res=>{
            console.log(res);
            this.setState({ufirstname:"",ulastname:"",uplace:""})
            window.location="/";
        })
    }
    render(){
        return(<React.Fragment>
           {
               this.state.students.map(student=>(
                   <div key={student._id} className="card" style={{borderRadius:"10px",padding:"15px",display:"inline-block",backgroundColor:"whitesmoke",marginLeft:"15px",marginTop:"10px"}}>
                        <div className="card-body">
                                <h2>First Name:{student.firstname}</h2>
                                <h2>Last Name:{student.lastname}</h2>
                                <h3>place:{student.place}</h3>
                                <div className="container" style={{display:"inline"}}>               
                                <button type="button" className="btn btn-warning btn-md" data-toggle="modal" data-target="#myModal" onClick={()=>{this.setState({ufirstname:student.firstname,ulastname:student.lastname,uplace:student.place,uid:student._id})}}>Update</button>
                                <button className="btn btn-danger" style={{marginLeft:"20px"}} onClick={()=>{this.handleDelete(student._id)}}>Delete</button>
                             
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                    
                                   
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Update</h4>
                                        </div>
                                        <div  className="modal-body"  >
                                        <input name="ufirstname"value={this.state.ufirstname} onChange={(e)=>{this.handleUpdate(e)}}placeholder="First Name" />
                                        <input name="ulastname" value={this.state.ulastname}onChange={(e)=>{this.handleUpdate(e)}} placeholder="Last Name" />
                                        <input name="uplace" value={this.state.uplace} onChange={(e)=>{this.handleUpdate(e)}} placeholder="Place"/>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-warning" onClick={(e)=>{this.handleModalUpdate(e)}}>Update</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({ufirstname:"",ulastname:"",uplace:""})}}>Close</button>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div>
                                
                                </div>
                               
                        </div>
                   </div>
               ))
           }
        </React.Fragment>)
    }
}

export default Liststudent;