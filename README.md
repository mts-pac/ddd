# Projeto DDD com Clean Architecture

Este é um projeto desenvolvido utilizando **Domain-Driven Design (DDD)** combinado com os princípios de **Clean Architecture**.

## Características

### Arquitetura e Design Patterns

- **Domain-Driven Design (DDD)**: Organização do código baseada no domínio do negócio
- **Clean Architecture**: Separação clara de responsabilidades em camadas (domain, infrastructure, usecase)
- **Factory Pattern**: Criação de entidades e objetos de valor de forma consistente
- **Repository Pattern**: Abstração da camada de persistência de dados
- **Notification Pattern**: Validação e coleta de erros de forma centralizada

### Validação

- Utilização do **Notification Pattern** para acumular e reportar erros de validação
- Validadores customizados utilizando Yup para garantir integridade dos dados

### Testes

O projeto possui cobertura abrangente de testes:

- **Testes Unitários**: Validação de regras de negócio e comportamento de entidades
- **Testes de Integração**: Verificação da comunicação entre componentes e camadas
- **Testes End-to-End (E2E)**: Validação de fluxos completos da aplicação

## Estrutura do Projeto

- `src/domain/`: Camada de domínio com entidades, eventos, serviços e regras de negócio
- `src/infrastructure/`: Implementações de infraestrutura (API, repositórios, persistência)
- `src/usecase/`: Casos de uso da aplicação (orquestração entre domínio e infraestrutura)

## Exemplos de Uso

Executar os testes:

```bash
npm run test # Executa todos os testes
npm run test:jest src/usecase/product # Executa os testes da camada de usecase de produto
npm run test:jest src/infrastructure/api/__tests__/product.e2e.spec.ts # Executa os testes da camada de API de produto
```

Todos os arquivos de testes possuem extensão `.spec.ts` e estão organizados conforme a estrutura do projeto. 

Para rodar testes específicos, utilize o comando `npm run test:jest` seguido do caminho do arquivo ou diretório desejado.
