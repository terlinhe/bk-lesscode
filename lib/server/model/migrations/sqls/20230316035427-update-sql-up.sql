ALTER TABLE `project`
ADD COLUMN `vueType` varchar(10) DEFAULT 'VUE2' COMMENT 'vue版本' AFTER `moduleCode`;