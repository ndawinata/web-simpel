import React, { Component, Fragment } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Axios from 'axios'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap';
import ReactCopyToClipboardUI from 'react-copy-to-clipboard-ui';
import jsonToTxt from "json-to-txt";
// import fileDownload from 'js-file-download'
import './cover.css'

const dateNow = moment().format('YYYY-MM-D')
const dateLast = moment().subtract(1, 'days').format('YYYY-MM-D')


const MyComponent = (props) => {
    const dataInString = jsonToTxt({ data: props.dataJson });
    return(
    <ReactCopyToClipboardUI>
        {dataInString}
    </ReactCopyToClipboardUI>
    )
}


const customStyles = {
    rows: {
        style: {
            minHeight: '35px', // override the row height
        }
    },
    headCells: {
        style: {
            fontSize: 16,
            justifyContent: 'center',
            color: '#fff',
            background: '#222831',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            justifyContent: 'center',
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

createTheme('gelap', {
    text: {
        primary: '#fff',
        secondary: '#fff',
    },
    background: {
        default: '#3f3f44',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#f7f7f7',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

class Cover extends Component {

    state={
        showModal:false,
        reload:false,
        loading:true,
        columns:[
            {
                name:'Date',
                selector:'date',
                sortable: true,
                cell: d => moment.utc(d.date).format('D MMMM YYYY')
            },
            {
                name:'Time',
                selector:'date',
                sortable: true,
                cell: d => moment.utc(d.date).format('HH:mm:ss')
            },
            {
                name:'Alat',
                selector:'alat',
                sortable: true
            },
            {
                name:'Merek',
                selector:'merek',
                sortable: true
            },
            {
                name:'Tahun',
                selector:'tahun',
                sortable: true
            },
            {
                name:'Kondisi',
                selector:'kondisi',
                sortable: true
            },
            {
                name:'Stasiun',
                selector:'statsiun',
                sortable: true
            },
            {
                name:'Catatan',
                selector:'catatan',
                sortable: true
            }
        ],
        tableData:{
            columns:[],
            data:[]
        }
        
    }

    handleClose(){
        this.setState({...this.state, showModal:false})
    }

    handleShow(){
        this.setState({...this.state, showModal:true})
    }

    // handleDownload(){
    //     fileDownload(data, 'jjj.css');
    // }

    componentDidMount(){
        const url = `https://cors-anywhere.herokuapp.com/http://139.180.220.65:3000/api/users/laporan/${dateLast}/${dateNow}`
        Axios.get(`https://cors-anywhere.herokuapp.com/http://139.180.220.65:3000/api/users/laporan/2020-09-30/2020-10-01`)
            .then((val)=>{
                let data = val.data.data
                data.reverse()
                this.setState({
                    ...this.state,
                    tableData:{
                        columns:this.state.columns,
                        data:data
                    } 
                })
                this.setState({...this.state, loading:false})
            })
    }

    updateData(){
        const url = `https://cors-anywhere.herokuapp.com/http://139.180.220.65:3000/api/users/laporan/${dateLast}/${dateNow}`
        Axios.get(`https://cors-anywhere.herokuapp.com/http://139.180.220.65:3000/api/users/laporan/2020-09-30/2020-10-01`)
            .then((val)=>{
                let data = val.data.data
                data.reverse()
                this.setState({
                    ...this.state,
                    tableData:{
                        columns:this.state.columns,
                        data:data
                    } 
                })
                this.setState({...this.state, loading:false})
            })
            .then(()=>{
                this.setState({...this.state, reload:false})
            })
    }

    reload(){
        if(this.state.reload){
            return(
                <span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
            )
        }
    }

    

    render() {
        return (
            <Fragment>
                {/* <Header status1={'active'} status2={''} status3={''} /> */}

                <main role="main" className="inner cover">
                    <h4 className="cover-heading mb-1">Laporan Kondisi Alat</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <DataTableExtensions {...this.state.tableData}>
                                    <DataTable theme='gelap' progressPending={this.state.loading} noHeader
                                        defaultSortField="id" defaultSortAsc={false} pagination paginationPerPage={5}
                                        highlightOnHover customStyles={customStyles} />
                                </DataTableExtensions>
                                <button type="button" className="btn btn-outline-light m-2" onClick={()=>{
                                    this.updateData()
                                    this.setState({...this.state, reload:true})
                                    }} >
                                    {this.reload()}Reload
                                </button>
                                <button type="button" className="btn btn-outline-light m-2" onClick={()=>{
                                    this.handleShow()
                                    }} >Show in Text</button>
                                <Modal size='lg' style={{color:'black'}} show={this.state.showModal} onHide={()=>
                                    {this.handleClose()}}>
                                    <Modal.Header>
                                        <Modal.Title>Laporan Kondisi Alat</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body scrollable={true}>
                                        <MyComponent dataJson={this.state.tableData.data} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="outline-dark" onClick={()=>{this.handleClose()}}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </main>

            </Fragment>
        )
    }
}

export default Cover
