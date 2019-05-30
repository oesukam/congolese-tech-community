import { PersonProject } from '../models';
import * as statusCodes from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';

const checkProject = async (req, res, next) => {
  const { projectId: _id } = req.params;

  const foundProject = await PersonProject.findOne({
    _id,
  });

  if (!foundProject) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: statusCodes.NOT_FOUND,
      message: notExist('Project'),
    });
  }

  req.personProject = foundProject;

  next();
};

export default checkProject;
