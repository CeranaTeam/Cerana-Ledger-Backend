const { plainToClass } = require("class-transformer");
const tagModel = require("../models/tag");
const { TagDTO } = require("../dto/tag");

const getTagList = async (req, res) => {
  const { userId } = req.middleware;
  try {
    const rows = await tagModel.getAll(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到任何標籤" });
      return;
    }
    const tags = [];
    rows.forEach((row) => {
      const tag = {
        tagId: row.tag_id,
        tagName: row.tag_name,
      };
      tags.push(tag);
    });

    res.status(200).json({ tagList: tags });
  } catch (err) {
    console.error("\n********** Get Tag List Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createTag = async (req, res) => {
  const { userId } = req.middleware;
  const { tagName } = req.body;
  const tag = {
    userId: userId,
    tagName: tagName,
  };
  try {
    const tagIsExist = await tagModel.isExist(userId, null, tagName);
    if (tagIsExist) {
      res.status(409).json({ message: "標籤已存在" });
      return;
    }
    const tagDTO = plainToClass(TagDTO, tag);
    await tagDTO.validate();
    const tagSQL = tagDTO.toSQL();
    const result = await tagModel.create(tagSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增標籤" });
    } else {
      res.status(409).json({ message: "新增標籤失敗" });
    }
  } catch (err) {
    console.error("\n********** Create Tag Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteTag = async (req, res) => {
  const { userId } = req.middleware;
  const { tagId } = req.body;
  try {
    const tagIsExist = await tagModel.isExist(userId, tagId);
    if (!tagIsExist) {
      res.status(409).json({ message: "標籤不存在" });
      return;
    }
    const result = await tagModel.remove(userId, tagId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除標籤" });
    } else {
      res.status(409).json({ message: "刪除標籤失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Tag Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getTagList, createTag, deleteTag };
