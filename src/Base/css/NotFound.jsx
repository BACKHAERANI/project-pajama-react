import pageNotfound from './NotFound.jpg';

function NotFound() {
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <img className="w-5/6" src={pageNotfound} alt="404 페이지" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
