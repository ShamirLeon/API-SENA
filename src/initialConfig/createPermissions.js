import permissionsData from "../data/permissions.json" assert { type: "json" };
import Permission from "../models/Permission/Permission.model.js";

const createPermissions = async () => {
  try {
    const countPermissions = await Permission.countDocuments();
    if (countPermissions > 0) return;
    const permissions = permissionsData.map(async (permission) => {
      const newPermission = new Permission(permission);
      await newPermission.save();
    });
    await Promise.all(permissions);
  } catch (error) {
    console.log(error);
  }
};

export default createPermissions;
