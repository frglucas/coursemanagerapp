import classNames from "classnames"

import './AddClients.style.scss'
import { FormAddClient, Title } from "../../components"

export const AddClients = () => {

    return (
        <div className={classNames('add-clients__container')}>
            <Title name="Adicionar cliente" />
            <FormAddClient />
        </div>
    )
}