const express = require('express');
const router = express.Router();
const {
  getChapterList,
  getChapterDetail,
  createChapter,
  updateChapter,
  deleteChapter,
} = require('../../controller/admin/chapterController');
const {
  createChapterValidate,
  updateChapterValidate,
  deleteAndGetDetailValidate,
} = require('../../validator/chapterValidate');

/**
 * 获取章节列表-支持模糊搜索
 * /api/v1/chapters
 */
router.get('/', getChapterList);

/**
 * 获取章节详情
 * /api/v1/chapters/:id
 */
router.get('/:id', deleteAndGetDetailValidate, getChapterDetail);

/**
 * 创建章节
 * /api/v1/chapters
 */
router.post('/', createChapterValidate, createChapter);

/**
 * 更新章节
 * /api/v1/chapters/:id
 */
router.put('/:id', updateChapterValidate, updateChapter);

/**
 * 删除章节
 * /api/v1/chapters/:id
 */
router.delete('/:id', deleteAndGetDetailValidate, deleteChapter);

module.exports = router;
