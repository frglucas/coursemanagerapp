import { useLocation } from 'react-router-dom';
import './ManageClass.style.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { BASIC_TABLE_HEADERS, PATH_ROUTES } from '../../constants';
import { BasicTable, Button, ButtonWithIcon, FormAddPayment, Input, Title } from '../../components';
import classNames from 'classnames';
import { useDeleteContractById, useGetAllClients, useGetAllContractsByClassId, usePostAddClientInClass } from '../../hooks';
import { Contract } from '../../models/Contract/Contract.model';
import { ClientBasic, BasicTableValue } from '../../models';
import { useModal } from '../../contexts';
import { toast } from 'react-toastify';

export const ManageClass = () => {
    const location = useLocation()
    const { handleOpenModal, handleCloseModal } = useModal()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.PRIVATE.MANAGE_CLASS.replace(':id', ''), ''))

    const [contracts, setContracts] = useState<Array<Contract>>([])

    const { call: callGetAllContractsByClassId } = useGetAllContractsByClassId()
    const { call: callPostAddClientInClass } = usePostAddClientInClass()
    const { call: callDeleteContractById } = useDeleteContractById()

    const getAllContracts = async () => {
        try {
            const { data } = await callGetAllContractsByClassId(id)

            setContracts(data.data)
        } catch {  }
    }

    const deleteContract = async (contractId: string) => {
        try {
            const { data } = await callDeleteContractById(contractId, id)
            toast.success(data.message)
        } catch { }
        finally {
            getAllContracts()
        }
    }

    useEffect(() => {
        getAllContracts()
    }, [])

    const getContracts = (): Array<BasicTableValue> => {
        return contracts.map(({ id, clientId, clientName, clientEmail, payment }) => ({
            fields: [clientName, clientEmail],
            actions: {
                canView: true,
                canEdit: false,
                canRemove: true,
                canAccept: false,
                onView: () => handleOpenModal(<FormAddPayment contractId={id} />),
                onEdit: () => null,
                onRemove: () => deleteContract(id),
                onAccept: () => null,
                canRenderView: true,
                canRenderEdit: false,
                canRenderRemove: true,
                canRenderAccept: false
            }
        }))
    }

    const handleAddClient = async (clientId: string) => {
        try {
            const { data } = await callPostAddClientInClass(clientId, id)
            toast.success(data.message)
        } catch { } 
        finally {
            handleCloseModal()
            getAllContracts()
        }
    }

    return (
        <div className={classNames('manage-class__container')}>
            <Title name='Gerenciar Turma' />
            <Button
                name={'Adicionar cliente'}
                type='button'
                classname='manage-class__container__add-client'
                onClick={() => handleOpenModal(<RenderContentModalAddClient onAddClient={handleAddClient} contracts={contracts}/>, 'Adicionar Cliente', 'manage-class__modal')}
            />
            <BasicTable 
                headerValues={BASIC_TABLE_HEADERS.CLASSES}
                bodyValues={getContracts()}
            />
        </div>
    )
};

type PropsRenderContentModalAddClient = {
    contracts: Array<Contract>,
    onAddClient: (clientId: string) => void
}

const RenderContentModalAddClient = ({ contracts, onAddClient }: PropsRenderContentModalAddClient) => {
    const [term, setTerm] = useState<string>('')

    const [clients, setClients] = useState<Array<ClientBasic>>([])
    
    const { call: callGetAllClients } = useGetAllClients()

    const getAllClients = async () => {
        try {
            const { data } = await callGetAllClients()

            setClients(data.data)
        } catch {  }
    }

    useEffect(() => {
        getAllClients()
    }, [])

    const getClientsFiltered = () => clients
        .filter(x => x.isActive)
        .filter(x => !contracts.map(x => x.clientId).includes(x.id))
        .filter(x => x.name.toUpperCase().includes(term.toUpperCase()) || x.email.toUpperCase().includes(term.toUpperCase()))

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTerm(event.target.value)
    }

    const renderLine = (id: string, name: string, email: string) => {
        return (
            <div className='modal-add-client__line'>
                <span>{`${name} (${email})`}</span>
                <ButtonWithIcon icon='Add' onClick={() => onAddClient(id)} />
            </div>
        )
    }

    return (
        <div className='modal-add-client'>
            <Input value={term} label='Pesquisar' onChange={handleChangeTerm} />
            <div className='modal-add-client__list'>
                {
                    getClientsFiltered().map(({ id, name, email }) => renderLine(id, name, email))
                }
            </div>
        </div>
    )
}