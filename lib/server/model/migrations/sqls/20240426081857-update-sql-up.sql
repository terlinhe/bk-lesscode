CREATE TABLE `saas_operate_log`  (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增唯一主键。系统保留字段，不可修改',
    `createTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '系统会默认写入数据创建时间。系统保留字段，不可修改',
    `createUser` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '系统会默认写入数据创建人。系统保留字段，不可修改',
    `updateTime` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '系统会默认写入数据更新时间。系统保留字段，不可修改',
    `updateUser` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '系统会默认写入数据更新人。系统保留字段，不可修改',
    `moduleId` int(11) NULL DEFAULT 0 COMMENT '所属module对应的saas-backend表id',
    `builderId` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '操作后下一次执行对应的执行id',
    `projectId` int(11) NULL DEFAULT 0 COMMENT '所属projectid',
    `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '操作后下一次执行状态',
    `operateType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '操作类型',
    `payloadData` text COMMENT '操作具体数据',
    `deleteFlag` int(11) NULL DEFAULT 0 COMMENT '是否删除，1代表已删除',
    PRIMARY KEY (`id`),
    INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci  ROW_FORMAT = Dynamic;