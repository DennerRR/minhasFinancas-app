import React from 'react'

import Card from '../Components/card'
import FormGroup from '../Components/form-group'
import {withRouter} from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import {mensagemSucesso, mensagemErro} from '../Components/toastr'

class CadastroUsuario extends React.Component{


    state ={
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }
    constructor(){
        super()
        this.service = new UsuarioService()
    }
    validar(){
        const msgs =[]

        if(!this.state.nome){
            msgs.push('O Campo nome é obrigatório.')
        }

        if(!this.state.email){
            msgs.push('O Campo Email é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um email válido. ')
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha duas vezes.')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem.')
        }


        return msgs
    }

    cadastrar = () =>{
        const msgs = this.validar()

        if(msgs && msgs.length>0){
            msgs.forEach((msg, index) =>{
                mensagemErro(msg)
            })
            return false
        }
        const usuario = {
            email: this.state.email,
            nome:this.state.nome,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
        .then(Response =>{
            mensagemSucesso('Usuario cadastrado com sucesso! faça o login para acessar o sistema')
            this.props.history.push('/login')
        }).catch(error =>{
            mensagemErro(error.Response.data)
        })
        
    }
    cancelar = () =>{
        this.props.history.push("/login")
    }
    render(){
        return(
            
                <Card title ="Cadastro de Usuário">
                    <div className="row">  
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" 
                                           id="inputNome" 
                                           className="form-control"
                                           nome="nome"
                                           onChange={e => this.setState({nome: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email"
                                           id ="inputEmail"
                                           className="form-control"
                                           name="email"
                                           onChange={e =>this.setState({email: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password"
                                           id ="inputSenha"
                                           className="form-control"
                                           name="senha"
                                           onChange={e =>this.setState({senha: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password"
                                           id ="inputRepitaSenha"
                                           className="form-control"
                                           name="repitasenha"
                                           onChange={e =>this.setState({senhaRepeticao: e.target.value})}/>
                                </FormGroup>
                                <button onClick={this.cadastrar}type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancelar }type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
        )
    }


}

export default withRouter(CadastroUsuario)