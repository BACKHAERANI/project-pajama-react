function ClothesCategory({ setCategory }) {
  const handlecategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  return (
    <div>
      <button className="mr-5" onClick={handlecategory} name="ALL" value="ALL">
        ALL
      </button>
      <button className="mr-5" onClick={handlecategory} name="TOP" value="TOP">
        TOP
      </button>
      <button
        className="mr-5"
        onClick={handlecategory}
        name="BLOUSE & SHIRT"
        value="BLOUSE & SHIRT"
      >
        BLOUSE & SHIRT
      </button>
      <button
        className="mr-5"
        onClick={handlecategory}
        name="DRESS"
        value="DRESS"
      >
        DRESS
      </button>
      <button
        className="mr-5"
        onClick={handlecategory}
        name="PANTS"
        value="PANTS"
      >
        PANTS
      </button>
      <button
        className="mr-5"
        onClick={handlecategory}
        name="SKIRT"
        value="SKIRT"
      >
        SKIRT
      </button>
      <button
        className="mr-5"
        onClick={handlecategory}
        name="OUTER"
        value="OUTER"
      >
        OUTER
      </button>
      <button
        className="mr-5"
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
