export default function TicketPricingSection() {
  return (
    <section className="py-5 bg-white text-center">
      <div className="container">
        {/* Heading */}
        <h2 className="fw-bold mb-2">
          Book Your Ziro Festival 2025 Tickets at Discounted Price!
        </h2>
        <p className="text-success fst-italic">
          One day or four — the valley’s waiting for you.
        </p>

        {/* Subtext */}
        <p className="text-muted mb-4">
          Save more when you book your festival tickets through us —
        </p>

        {/* Pricing Table */}
        <div className="table-responsive">
          <table className="table text-center w-100">
            <thead>
              <tr>
                <th
                  style={{
                    borderTop: '1px solid #dee2e6',
                    borderBottom: '1px solid #dee2e6',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                >
                  Price on Official Site
                </th>
                <th
                  style={{
                    borderTop: '1px solid #dee2e6',
                    borderBottom: '1px solid #dee2e6',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                >
                  <span
                    style={{
                      background: 'radial-gradient(circle, #fff176, transparent)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                    }}
                  >
                    Our Price
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="text-muted"
                  style={{
                    borderTop: '1px solid #dee2e6',
                    borderBottom: '1px solid #dee2e6',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                >
                  ₹9,000
                </td>
                <td
                  style={{
                    borderTop: '1px solid #dee2e6',
                    borderBottom: '1px solid #dee2e6',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                >
                  <span
                    style={{
                      background: 'radial-gradient(circle, #fff176, transparent)',
                      padding: '8px 16px',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                    }}
                  >
                    ₹8,600
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="mt-4">
          <a
            href="#"
            className="btn btn-success px-4 py-2 fw-bold shadow"
            style={{ borderRadius: '12px' }}
          >
            Grab Your Tickets Today!
          </a>
        </div>
      </div>
    </section>
  );
}
