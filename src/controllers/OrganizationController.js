import { Organization } from '../models';
import { statusCodes, responseMessages } from '../constants';

/**
 * @description Organization Controller class
 */
export default class OrganizationsController {
  /**
   * Get all organizations
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} organizations
   * @memberof OrganizationsController
   */
  static async getAll(req, res) {
    const organizations = await Organization.find({})
      .populate('user', 'picture username firstName lastName')
      .exec();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      organizations,
    });
  }

  /**
   * Get a single organization
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} organization
   * @memberof OrganizationsController
   */
  static async get(req, res) {
    const { organization } = req;

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      organization,
    });
  }

  /**
   * Create an organization
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} organization
   * @memberof OrganizationsController
   */
  static async post(req, res) {
    const { body, currentUser } = req;

    const foundRecord = await Organization.findOne({
      registrationNumber: body.registrationNumber,
    });

    if (foundRecord) {
      return res.status(statusCodes.CONFLICT).json({
        status: statusCodes.CONFLICT,
        message: responseMessages.exist('Organization'),
      });
    }

    body.user = currentUser._id;
    const organization = await Organization.create(body);

    return res.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      organization,
      message: responseMessages.created('Organization'),
    });
  }

  /**
   * Update an organization
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {void} organization
   * @memberof OrganizationsController
   */
  static async update(req, res) {
    const { body, currentUser, organization } = req;

    if (!currentUser._id.equals(organization.user._id)) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: statusCodes.UNAUTHORIZED,
        message: responseMessages.unauthorized(),
      });
    }

    await organization.updateOne(body);

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      organization: { ...organization.toObject(), ...body },
      message: responseMessages.updated('Organization'),
    });
  }
}
