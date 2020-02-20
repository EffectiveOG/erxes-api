import { commonMutationParams, commonTypes, conformityQueryFields, copyParams } from './common';

export const types = `
  type Task {
    _id: String!
    companies: [Company]
    customers: [Customer]
    createdUser: User
    ${commonTypes}
  }
`;

export const queries = `
  taskDetail(_id: String!): Task
  tasks(
    pipelineId: String
    stageId: String
    customerIds: [String]
    companyIds: [String]
    date: ItemDate
    skip: Int
    search: String
    assignedUserIds: [String]
    closeDateType: String
    priority: [String]
    labelIds: [String]
    sortField: String
    sortDirection: Int
    ${conformityQueryFields}
  ): [Task]
  archivedTasks(pipelineId: String!, search: String, page: Int, perPage: Int): [Task]
`;

export const mutations = `
  tasksAdd(name: String!, ${copyParams}, ${commonMutationParams}): Task
  tasksEdit(_id: String!, name: String, ${commonMutationParams}): Task
  tasksChange( _id: String!, destinationStageId: String): Task
  tasksUpdateOrder(stageId: String!, orders: [OrderItem]): [Task]
  tasksRemove(_id: String!): Task
  tasksWatch(_id: String, isAdd: Boolean): Task
  tasksCopy(_id: String!): Task
  tasksArchive(stageId: String!): String
`;
