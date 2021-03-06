import { conformityQueryFields } from './common';

export const types = `
  type Company {
    _id: String!

    createdAt: Date
    modifiedAt: Date
    avatar: String

    size: Int
    website: String
    industry: String
    plan: String
    parentCompanyId: String
    ownerId: String

    names: [String]
    primaryName: String

    emails: [String]
    primaryEmail: String


    phones: [String]
    primaryPhone: String


    leadStatus: String
    lifecycleState: String
    businessType: String
    description: String
    doNotDisturb: String
    links: CompanyLinks
    owner: User
    parentCompany: Company

    tagIds: [String]

    customFieldsData: JSON

    customers: [Customer]
    getTags: [Tag]
  }

  type CompaniesListResponse {
    list: [Company],
    totalCount: Float,
  }

  type CompanyLinks {
    linkedIn: String
    twitter: String
    facebook: String
    github: String
    youtube: String
    website: String
  }
`;

const queryParams = `
  page: Int
  perPage: Int
  segment: String
  tag: String
  ids: [String]
  searchValue: String
  lifecycleState: String
  leadStatus: String
  sortField: String
  sortDirection: Int
  brand: String
  ${conformityQueryFields}
`;

export const queries = `
  companiesMain(${queryParams}): CompaniesListResponse
  companies(${queryParams}): [Company]
  companyCounts(${queryParams}, byFakeSegment: JSON, only: String): JSON
  companyDetail(_id: String!): Company
`;

const commonFields = `
  avatar: String,

  primaryName: String,
  names: [String]

  primaryPhone: String,
  phones: [String],

  primaryEmail: String,
  emails: [String],

  size: Int,
  website: String,
  industry: String,

  parentCompanyId: String,
  email: String,
  ownerId: String,
  leadStatus: String,
  lifecycleState: String,
  businessType: String,
  description: String,
  doNotDisturb: String,
  links: JSON,

  tagIds: [String]
  customFieldsData: JSON
`;

export const mutations = `
  companiesAdd(${commonFields}): Company
  companiesEdit(_id: String!, ${commonFields}): Company
  companiesRemove(companyIds: [String]): [String]
  companiesMerge(companyIds: [String], companyFields: JSON) : Company
`;
