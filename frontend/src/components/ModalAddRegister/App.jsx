
import '../ModalAddRegister/styles.css'
import ExitButton from '../../assets/ExitButton.png'
import { useState } from 'react'


function ModalAddRegister({ addRegister, setAddRegister, transfer, setTransfer, listTransfers, loggedInUser }) {

    const [entryButton, setEntryButton] = useState(true)
    const [outputButton, setOutputButton] = useState(false)

    function handleChangeEntry() {

        setEntryButton(true)
        setOutputButton(false)
    }

    function handleChangeOutput() {

        setEntryButton(false)
        setOutputButton(true)
    }

    function handleChange(e) {

        const value = e.target.value

        setTransfer({ ...transfer, [e.target.name]: value })

    }

    function handleSubmit(event) {

        event.preventDefault();

        if (transfer.amount < 0 || transfer.amount === 0 || !transfer.category || !transfer.data || !transfer.description) {
            return
        }

        listTransfers.push(transfer)

        localStorage.setItem('transfers', JSON.stringify(listTransfers));

        console.log(listTransfers)

        console.log(loggedInUser)

    }

    if (addRegister) {

        return (

            <div>

                <div className='background-modal'>

                    <div div className="modal-container">

                        <div className='modal-title'>

                            <h1>Adicionar Registro</h1>

                            <img className='modal-exit-button' src={ExitButton} onClick={() => setAddRegister(false)} />

                        </div>

                        <div className='out-entry-buttons'>

                            <button

                                className={entryButton ? 'entry-active' : 'entry-inactive'}
                                type='button'
                                name='type'
                                value='entrada'
                                onClick={() => handleChangeEntry()}
                                onChange={(e) => handleChange(e)}
                            >
                                Entrada
                            </button>
                            <button
                                className={outputButton ? 'output-active' : 'output-inactive'}
                                type='button'
                                name='type'
                                value='saida'
                                onClick={() => handleChangeOutput()}
                                onChange={(e) => handleChange(e)}

                            >
                                Saida
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <label>Valor</label>
                            <input type='number' name='amount' value={transfer.amount} onChange={(e) => handleChange(e)} />

                            <label>Categoria</label>

                            <select value={transfer.category} name='category' onChange={(e) => handleChange(e)}>

                                <option value=''></option>

                                <option value='pix'>Pix</option>

                                <option value='contas'>Contas</option>

                                <option value='lazer'>Lazer</option>

                                <option value='mercado'>Mercado</option>

                                <option value='ted'>TED</option>

                                <option value='compras'>Compras</option>

                                <option value='farmacia'>Fármacia</option>

                                <option value='depostio'>Depósito</option>

                            </select>

                            <label>Data</label>
                            <input name='data' type='date' value={transfer.data} onChange={(e) => handleChange(e)} />

                            <label>Descrição</label>
                            <input name='description' type='text' value={transfer.description} onChange={(e) => handleChange(e)} />

                            <button type='submit'>Confirmar</button>
                        </form>

                    </div>

                </div>

            </div >

        )
    }

}

export default ModalAddRegister