import rolesData from "../data/roles.json" assert { type: "json" };
import Roles from "../models/Roles/Roles.model.js";

const createRoles = async () => {
  try {
    const countRoles = await Roles.countDocuments();
    if (countRoles > 0) return;
    const roles = rolesData.map(async (role) => {
      const newRole = new Roles(role);
      await newRole.save();
    });
    await Promise.all(roles);
  } catch (error) {
    console.log(error);
  }
};

export default createRoles;
