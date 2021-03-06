import { Document, Schema } from 'mongoose';

import {
  COMPANY_BUSINESS_TYPES,
  COMPANY_INDUSTRY_TYPES,
  COMPANY_LEAD_STATUS_TYPES,
  COMPANY_LIFECYCLE_STATE_TYPES,
  STATUSES,
} from './constants';

import { field, schemaWrapper } from './utils';

export interface ILink {
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  github?: string;
  youtube?: string;
  website?: string;
}

interface ILinkDocument extends ILink, Document {}

export interface ICompany {
  scopeBrandIds?: string[];
  primaryName?: string;
  avatar?: string;
  names?: string[];
  size?: number;
  industry?: string;
  plan?: string;
  parentCompanyId?: string;

  primaryEmail?: string;
  emails?: string[];

  ownerId?: string;

  primaryPhone?: string;
  phones?: string[];

  mergedIds?: string[];
  leadStatus?: string;
  status?: string;
  lifecycleState?: string;
  businessType?: string;
  description?: string;
  employees?: number;
  doNotDisturb?: string;
  links?: ILink;
  tagIds?: string[];
  customFieldsData?: any;
  website?: string;
}

export interface ICompanyDocument extends ICompany, Document {
  _id: string;
  links?: ILinkDocument;
  status?: string;
  createdAt: Date;
  modifiedAt: Date;
  searchText: string;
}

const linkSchema = new Schema(
  {
    linkedIn: field({ type: String, optional: true, label: 'LinkedIn' }),
    twitter: field({ type: String, optional: true, label: 'Twitter' }),
    facebook: field({ type: String, optional: true, label: 'Facebook' }),
    github: field({ type: String, optional: true, label: 'Github' }),
    youtube: field({ type: String, optional: true, label: 'Youtube' }),
    website: field({ type: String, optional: true, label: 'Website' }),
  },
  { _id: false },
);

export const companySchema = schemaWrapper(
  new Schema({
    _id: field({ pkey: true }),

    createdAt: field({ type: Date, label: 'Created at' }),
    modifiedAt: field({ type: Date, label: 'Modified at' }),

    primaryName: field({
      type: String,
      label: 'Name',
      optional: true,
    }),

    names: field({
      type: [String],
      optional: true,
      label: 'Names',
    }),

    avatar: field({
      type: String,
      optional: true,
      label: 'Avatar',
    }),

    size: field({
      type: Number,
      label: 'Size',
      optional: true,
    }),

    industry: field({
      type: String,
      enum: COMPANY_INDUSTRY_TYPES,
      label: 'Industry',
      optional: true,
    }),

    website: field({
      type: String,
      label: 'Website',
      optional: true,
    }),

    plan: field({
      type: String,
      label: 'Plan',
      optional: true,
    }),

    parentCompanyId: field({
      type: String,
      optional: true,
      label: 'Parent Company',
    }),

    primaryEmail: field({ type: String, optional: true, label: 'Primary email' }),
    emails: field({ type: [String], optional: true, label: 'Emails' }),

    primaryPhone: field({ type: String, optional: true, label: 'Primary phone' }),
    phones: field({ type: [String], optional: true, label: 'Phones' }),

    ownerId: field({ type: String, optional: true, label: 'Owner' }),

    leadStatus: field({
      type: String,
      enum: COMPANY_LEAD_STATUS_TYPES,
      optional: true,
      label: 'Lead Status',
    }),

    status: field({
      type: String,
      enum: STATUSES.ALL,
      default: STATUSES.ACTIVE,
      optional: true,
      label: 'Status',
    }),

    lifecycleState: field({
      type: String,
      enum: COMPANY_LIFECYCLE_STATE_TYPES,
      optional: true,
      label: 'Lifecycle State',
    }),

    businessType: field({
      type: String,
      enum: COMPANY_BUSINESS_TYPES,
      optional: true,
      label: 'Business Type',
    }),

    description: field({ type: String, optional: true, label: 'Description' }),
    employees: field({ type: Number, optional: true, label: 'Employees' }),
    doNotDisturb: field({
      type: String,
      optional: true,
      label: 'Do not disturb',
    }),
    links: field({ type: linkSchema, default: {}, label: 'Links' }),

    tagIds: field({
      type: [String],
      optional: true,
      label: 'Tags',
    }),

    // Merged company ids
    mergedIds: field({ type: [String], optional: true, label: 'Merged companies' }),

    customFieldsData: field({
      type: Object,
      label: 'Custom fields',
    }),
    searchText: field({ type: String, optional: true, index: true }),
  }),
);
