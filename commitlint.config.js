module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // tính năng mới
        'fix', //Sửa lỗi
        'improve', //Cải thiện code
        'refactor', //Tái cấu trúc code
        'docs', //Thêm tài liệu
        'chore', //Thay đổi nhỏ trong quá trình phát triển
        'style', //Thay đổi kiểu chữ, định dạng không ảnh hưởng tới logic
        'test', //Viết test
        'revert', //Revert lại commit trước đó
        'ci', //Thay đổi cấu hình CI/CD
        'build',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};

// Số 2 trong config ở trên là mức độ, bao gồm:
// 0: Không có lỗi (off)
// 1: Cảnh báo (warning)
// 2: Lỗi (error)
// type-enum: Giá trị của type (loại commit) phải thuộc danh sách được định nghĩa (từ khóa trong mảng bên trong rule). Giá trị này luôn phải xuất hiện trong message của commit.
// type-case: Type luôn phải được viết thường (lower-case).
// type-empty: Message không được để trống.
// scope-empty: Scope không được để trống.
// subject-empty: Subject không được để trống.
// subject-full-stop: Subject không được kết thúc bằng dấu chấm.
//correct commit: rules(subject): message
