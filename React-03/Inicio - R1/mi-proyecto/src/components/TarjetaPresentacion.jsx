export default function TarjetaPresentacion({ nombre, apellido, profesion, imagen }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card m-2" style={{ width: "18rem" }}>
        <img
          src={imagen}
          className="card-img-top"
          alt={`${nombre} ${apellido}`}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">
            {nombre} {apellido}
          </h5>
          <p className="card-text">{profesion}</p>
        </div>
      </div>
    </div>
  );
}