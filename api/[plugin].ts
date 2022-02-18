import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLatestVersion } from "../utils";

export default (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { plugin },
  } = req;

  try {
    const { filePath, version } = getLatestVersion(plugin as string);

    return res.json({
      version,
      package: filePath,
    });
  } catch (e) {
    return res.status(404).json({
      message: `Sorry, couldn't find a config file for '${plugin}'.`,
    });
  }
};
