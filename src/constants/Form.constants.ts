export const FORM_ADD_CLIENT = {
    RADIO_DOCUMENT_TYPE: {
        DEFAULT: '1',
        VALUES: [
            { label: 'CPF', value: '1' }, 
            { label: 'CNPJ', value: '2' }
        ]
    },
    RADIO_IS_SMOKER: {
        DEFAULT: 'false',
        VALUES: [
            { label: 'Não', value: 'false'}, 
            { label: 'Sim', value: 'true' }
        ]
    },
    SELECT_GENDER : {
        VALUES: [
            { label: 'Não informar', value: '0' },
            { label: 'Masculino', value: '1' },
            { label: 'Feminino', value: '2' },
            { label: 'Outro', value: '3' },
        ]
    }
}