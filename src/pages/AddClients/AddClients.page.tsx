import classNames from "classnames"
import { FormAddClient, Title } from "../../components"

import './AddClients.style.scss'

export const AddClients = () => {

    return (
        <div className={classNames('add-clients__container')}>
            <Title name="Adicionar cliente" />
            <FormAddClient />
        </div>
    )
}