import { useRecoilState } from 'recoil';
import { pageNameState } from '../../states';
import Link from 'next/link';

const Test = () => {
    const [pageName, setPageName] = useRecoilState(pageNameState);

    return (
        <div>
            <div>
                <h1>Index Page!</h1>
            </div>
            <div>
                <span>pageName 상태: {pageName}</span>
            </div>
            <div>
                <button
                    onClick={() => {
                        setPageName('Test');
                    }}
                >
                    현재 페이지 이름으로 상태 변경
                </button>
                <Link href="/post">
                    <button>Post Pages 이동</button>
                </Link>
            </div>
        </div>
    );
};

export default Test;
