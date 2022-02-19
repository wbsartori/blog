const CategoryForm = {
    action : {
            novo: '/admin/articles/new',
            update: '/admin/articles/update',
            edit: '/admin/articles/edit/',
            delete: '/admin/articles/delete'
        },
    titulo : {
        titulo_aba: 'Editar artigo',
        titulo_formulario: 'Editar artigo',
    },
    metodo: 'post',
    botao : {
        novo : 'Novo',
        editar : 'Editar',
        cadastrar : 'Atualizar',
        salvar : 'Salvar',
        cancelar: 'Cancelar',
        deletar : 'Excluir',
        confirmar : 'Confirmar',
    },
    mensagem: {
        novo : 'Artigo salvo com sucesso !',
        editar : 'Artigo atualizado com sucesso !',
        deletar : 'Artigo removido com sucesso !',
        confirma_delete: 'Tem certeza que deseja excluir este artigo ?',
        erro : {
            erro_titulo : 'O título do artigo não esta preenchido!',
            erro_categoria : 'A categoria do artigo não está preenchida!',
            erro_artigo : 'O artigo ainda não foi preenchido!',
            erro_null : 'Não foi possível encontrar o artigo!',
            erro_salvar : 'Erro ao cadastrar artigo!',
            erro_deletar : 'Erro ao excluir artigo!',
            erro_deletar_id : 'Não encontramos o id deste artigo!'
        },
        sucesso: {
            salvar: 'Artigo criado com sucesso!',
            editar: 'Artigo atualizado com sucesso!',
            deletar: 'Artigo excluido com sucesso!'
        }
    }
}

module.exports = CategoryForm;