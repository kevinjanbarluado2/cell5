import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,InputGroup,InputGroupAddon, Input, FormGroup, Label, Jumbotron, Container} from 'reactstrap';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { data } from 'jquery';

export default class Example extends Component {

    constructor(){
        super()
        this.state = {
            sorted:false,
            guitars: [],
            newGuitarModal: false,
            newGuitarData: {
                name: "",
                description: "",
                price: ""
            },
            editGuitarModal:false,
            editGuitarData: {
                id: "",
                name: "",
                description:"",
                price: ""
            }

        };
        this.onSort = this.onSort.bind(this)
    }
    
    loadGuitar(){
        axios.get('http://127.0.0.1:8000/api/guitars').then((response) => {
            this.setState({
                guitars:response.data
            })
        })
    }

    onSort(event, sortKey){
        const data = this.state.guitars;
        //console.log(this.state.sorted);
        //console.log(data);
        
        (!this.state.sorted)?data.sort((a,b) => "a[sortKey]".localeCompare("b[sortKey]")):data.sort((a,b) => "a[sortKey]".localeCompare("b[sortKey]")).reverse();


        this.setState({data,sorted:!this.state.sorted});
    }

    addGuitar(){
        axios.post('http://127.0.0.1:8000/api/guitar', this.state.newGuitarData).then((response) => {
            let { guitars } = this.state;
            this.loadGuitar()
            this.setState({
                guitars,
                newGuitarModal:false,
                newGuitarData:{
                    name:"",
                    description:"",
                    price:""
                }

            })


        })
    }

    editGuitar(id, name, description, price){
        this.setState({
            editGuitarData:{
                id,
                name,
                description,
                price
            },
            editGuitarModal: !this.state.editGuitarModal
        })
    }

    updateGuitar(){
        //console.log('working');
        let { taskId, name, description, price } = this.state.editGuitarData;
        axios.put('http://127.0.0.1:8000/api/guitar/'+this.state.editGuitarData.id, {
            name,
            description,
            price
        }).then((response) => {
            //console.log(response);
            this.loadGuitar();
            this.setState({
                editGuitarModal: false,
                editGuitarData:{
                    id:"",
                    name:"",
                    description: "",
                    price: ""
                }
            })
        })

    }

    deleteGuitar(id){
        axios.delete('http://127.0.0.1:8000/api/guitar/'+id).then((response)=>{
            this.loadGuitar();
        });
    }

    componentWillMount(){
        this.loadGuitar();
    }

    toggleNewGuitarModal(){
        this.setState({
            newGuitarModal: !this.state.newGuitarModal
        })
    }

    toggleEditGuitarModal(){
        this.setState({
            editGuitarModal: !this.state.editGuitarModal
        })
    }

    

    render(){
        
        let guitars = this.state.guitars.map((guitar)=>{
            return(
                <tr key={guitar.id}>
                    <td>{guitar.id}</td>
                    <td>{guitar.name}</td>   
                    <td>{guitar.description}</td>     
                    <td>$ {guitar.price}</td>   
                    <td>
                         <Button onClick={this.editGuitar.bind(this, guitar.id, guitar.name, guitar.description, guitar.price)} color="success" size="sm" className="mr-2">Edit</Button>
                         <Button onClick={this.deleteGuitar.bind(this,guitar.id)} color="danger" size="sm" className="mr-2" >Delete</Button>
                    </td>
                </tr>
            )
        });

        

        let dtData = this.state.guitars;
       
            dtData.forEach((x,y)=>{
                
                let editBtn = 
                    <div>
                        <Button onClick={this.editGuitar.bind(this, x.id, x.name, x.description, x.price)} color="success" size="sm" className="mr-2">Edit</Button>
                        <Button onClick={this.deleteGuitar.bind(this,x.id)} color="danger" size="sm" className="mr-2" >Delete</Button>
                    </div>
                dtData[y].actions = editBtn;  
                dtData[y].newPrice = `$ ${x.price}`;
                

            }
            );
        const newData = [];
        const newObj= {};
        newObj.test='yow';
        
        const dtColumns = [
            {
              name: '#',
              selector: 'id',
              sortable: true,
              maxWidth: "1rem"
            },
            {
              name: 'Name',
              selector: 'name',
              sortable: true,
              wrap: true,
              
        
            },
            {
                name: 'Description',
                selector: 'description',
                sortable: true,
            },
            {
                name: 'Price',
                selector: 'newPrice',
                sortable: true,
            },
            {
                name: 'Actions',
                selector: 'actions',
                center: true,
                maxWidth: "auto"

            },
          ];
          

        return (

            <Container className="themed-container" fluid={true}>
             <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Kevin's Guitar Store</h1>
          <hr className="my-2" />
          <Button color="primary" onClick={this.toggleNewGuitarModal.bind(this)} className="my-3">Add Guitar</Button>
        </Container>
      </Jumbotron>

            
            <Modal isOpen={this.state.newGuitarModal} toggle={this.toggleNewGuitarModal.bind(this)} >
                <ModalHeader toggle={this.toggleNewGuitarModal.bind(this)}>Add Guitar</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                id="name" 
                                value={this.state.newGuitarData.name}
                                onChange={(e)=>{
                                    let { newGuitarData } = this.state
                                    newGuitarData.name = e.target.value
                                    this.setState({newGuitarData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                id="description"
                                value={this.state.newGuitarData.description}
                                onChange={(e)=>{
                                    let { newGuitarData } = this.state
                                    newGuitarData.description = e.target.value
                                    this.setState({newGuitarData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input id="price" type="number" pattern="[0-9]*" 
                            value={this.state.newGuitarData.price}
                            onChange={(e)=>{
                                let { newGuitarData } = this.state
                                newGuitarData.price = e.target.value
                                this.setState({newGuitarData})
                            }}></Input>
                             </InputGroup>
                        </FormGroup>
                    </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={this.addGuitar.bind(this)}>Add Guitar</Button>
                    <Button color="secondary" onClick={this.toggleNewGuitarModal.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
                    
                        
            <Modal isOpen={this.state.editGuitarModal} toggle={this.toggleEditGuitarModal.bind(this)} >
                <ModalHeader toggle={this.toggleEditGuitarModal.bind(this)}>Edit Guitar</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                id="name" 
                                value={this.state.editGuitarData.name}
                                onChange={(e)=>{
                                    let { editGuitarData } = this.state
                                    editGuitarData.name = e.target.value
                                    this.setState({editGuitarData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                id="description"
                                value={this.state.editGuitarData.description}
                                onChange={(e)=>{
                                    let { editGuitarData } = this.state
                                    editGuitarData.description = e.target.value
                                    this.setState({editGuitarData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input id="price" type="number" pattern="[0-9]*" 
                            value={this.state.editGuitarData.price}
                            onChange={(e)=>{
                                let { editGuitarData } = this.state
                                editGuitarData.price = e.target.value
                                this.setState({editGuitarData})
                            }}></Input>
                             </InputGroup>
                        </FormGroup>
                    </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={this.updateGuitar.bind(this)}>Edit Guitar</Button>
                    <Button color="secondary" onClick={this.toggleEditGuitarModal.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
                     {/*            <Table striped>
                 <thead> 
                  <tr>
                     <th onClick={e => this.onSort(e, 'id')}>#</th>
                     <th onClick={e => this.onSort(e, 'name')}>Name</th>   
                     <th onClick={e => this.onSort(e, 'description')}>Description</th>     
                     <th onClick={e => this.onSort(e, 'price')}>Price</th>       
                     <th>Actions</th> 
                 </tr>   
                 </thead>  
                 <tbody>
                  
                    {guitars}
                  
                 </tbody>    
             </Table>  
                        */}

             <DataTable
            title="Guitars"
            columns={dtColumns}
            data={dtData}
            striped='true'
            className="mb-5"
            responsive='true'
            />


    </Container>



        )
    }

}


if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
