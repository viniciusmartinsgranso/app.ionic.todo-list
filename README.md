# Projeto Angular com Ionic

Este é um aplicativo desenvolvido em Angular com Ionic para gerenciar usuários e tarefas. O sistema permite o cadastro e a gestão de usuários e tarefas, oferecendo funcionalidades para a criação, edição, exclusão e listagem de ambos. Além disso, o aplicativo inclui filtros e opções de ordenação para facilitar a visualização e o gerenciamento das tarefas.

## Funcionalidades

- **Banco de Dados**: O banco de dados para essa aplicação é o localStorage do próprio navegador.

### Cadastro de Usuários

- **Criar**: Adicione novos usuários ao sistema.
- **Editar**: Modifique as informações dos usuários existentes.
- **Excluir**: Remova usuários do sistema.
- **Listar**: Visualize todos os usuários cadastrados.

Cada usuário possui:
- Nome
- Nível (admin, user)

### Componente de Lista de Tarefas

- **Criar**: Adicione novas tarefas ao sistema.
- **Editar**: Modifique as tarefas existentes.
- **Excluir**: Remova tarefas do sistema.
- **Listar**: Visualize todas as tarefas cadastradas.

Cada tarefa possui:
- Título
- Descrição
- Data de Criação
- Data de Vencimento
- Status (pendente, em andamento, concluída)
- Usuário associado

### Filtros

- **Filtragem**: Permite filtrar tarefas por status.

### Associação de Tarefas a Usuários

- **Atribuição**: Permite que tarefas sejam atribuídas a usuários específicos.
- **Listagem por Usuário**: Permite listar as tarefas de um usuário específico.

## Configuração Inicial

1. **Clone o repositório**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2. **Navegue até o diretório do projeto**

    ```bash
    cd app.ionic.todo-list
    ```

3. **Instale as dependências**

    ```bash
    npm install
    ```

4. **Execute o aplicativo**

    ```bash
    ionic serve
    ```

## Acesso Inicial

Para realizar o login inicial como administrador, use as seguintes credenciais:

- **Email**: `admin@admin.com`
- **Senha**: `123456`

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato através do email `viniciusmartinsg@hotmail.com`.
