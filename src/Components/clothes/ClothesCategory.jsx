function ClothesCategory({ setCategory }) {
  const handlecategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  return (
    <div className="my-5">
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="ALL"
        value="ALL"
      >
        ALL
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="TOP"
        value="TOP"
      >
        TOP
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="BLOUSE & SHIRT"
        value="BLOUSE & SHIRT"
      >
        BLOUSE & SHIRT
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="DRESS"
        value="DRESS"
      >
        DRESS
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="PANTS"
        value="PANTS"
      >
        PANTS
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="SKIRT"
        value="SKIRT"
      >
        SKIRT
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="OUTER"
        value="OUTER"
      >
        OUTER
      </button>
      <button
        className="mr-5 hover:text-indigo-800 hover:font-bold"
        onClick={handlecategory}
        name="ACC & CAP"
        value="ACC & CAP"
      >
        ACC & CAP
      </button>
    </div>
  );
}

export default ClothesCategory;
