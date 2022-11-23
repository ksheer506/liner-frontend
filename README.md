# liner-frontend

## 1. 프로젝트 시작 방법
```bash
git clone https://github.com/ksheer506/liner-frontend.git
```
git 원격 저장소를 로컬로 복사합니다.

```bash
cd liner-frontend && npm install
```
`liner-frontend` 폴더로 이동 후 node modules를 설치해줍니다.
```bash
npm start
```
라이브 서버를 켜고 개발을 시작합니다.  
<br/>
## 참고 사항
### 최초 개발 환경
- npm: v8.5.5
- node: v16.15.0

<br/><br/>
## 2. 프로젝트 폴더 구조
```
src
├── apis: 프론트엔드쪽 API 관련 로직
├── assets
│   ├── images
│   └── styles
├── components
├── hooks: 전역에서 사용하는 커스텀 훅
├── pages
├── types: 전역에서 사용하는 타입 정의
└── utils
```
전역에서 사용하는 코드는 `/src` 각 폴더 내부에 두고, 그 외에 특정 컴포넌트에서만 사용하는 코드는 `/components`, `/pages` 각 폴더 내부에 놓음

<br/><br/>
## 3. git 커밋 컨벤션
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `style`: 스타일 수정
- `test`: 테스트 코드 추가
- `chore`: 그 외의 수정 사항

커밋 메세지 앞에 이슈 번호 추가
```
git commit -m "#1 feat: 로그인 기능 추가"
```
