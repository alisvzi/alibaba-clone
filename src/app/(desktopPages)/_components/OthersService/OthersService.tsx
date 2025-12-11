const OthersService = () => {
  const driverClass =
    "self-stretch min-h-px min-w-px my-3 mx-1 border-0 grow-0 shrink basis-0 max-w-full bg-border";
  return (
    <div className="mb-5">
      <h3 className="text-foreground font-bold my-4">سایر خدمات علی‌بابا</h3>
      <div className="border border-border rounded flex md:gap-4 flex-wrap items-start py-2">
        <a
          href="/safarcard"
          className="btn is-md is-raw flex-1 wrapper-sub-product"
          aria-label="خدمت جدید، سفرکارت سازمانی"
        >
          <div className="a-card badge-wrapper border-0">
            <div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
              <div className="product-image">
                <img
                  src="https://cdn.alibaba.ir/h2/desktop/assets/images/safarcard-3dc2c4c4.svg"
                  alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/safarcard-3dc2c4c4.svg"
                  className="is-responsive is-animated"
                  width={46}
                  height={46}
                />
              </div>
              <span className="text-body-md md:mr-1 text-grays-500">
                سفرکارت (سازمانی)
              </span>
            </div>
          </div>
        </a>
        <div className={driverClass}></div>
        <a
          href="/installment-travel"
          className="btn is-md is-raw flex-1 wrapper-sub-product"
          aria-label="سفر اقساطی"
        >
          <div className="a-card badge-wrapper border-0">
            <div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
              <div className="product-image">
                <img
                  src="https://cdn.alibaba.ir/h2/desktop/assets/images/installment/instalment-icon-91668a01.svg"
                  alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/installment/instalment-icon-91668a01.svg"
                  className="is-responsive is-animated"
                  width={46}
                  height={46}
                />
              </div>
              <span className="text-body-md md:mr-1 text-grays-500">
                سفر اقساطی
              </span>
            </div>
          </div>
        </a>
        <div className={driverClass}></div>
        <a
          href="/visa"
          className="btn is-md is-raw flex-1 wrapper-sub-product"
          aria-label="ویزای سفر"
        >
          <div className="a-card badge-wrapper border-0">
            <div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
              <div className="product-image">
                <img
                  src="https://cdn.alibaba.ir/h2/desktop/assets/images/visa-icon-d8507c8e.svg"
                  alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/visa-icon-d8507c8e.svg"
                  className="is-responsive is-animated"
                  width={46}
                  height={46}
                />
              </div>
              <span className="text-body-md md:mr-1 text-grays-500">
                ویزای سفر
              </span>
            </div>
          </div>
        </a>
        <div className={driverClass}></div>
        <a
          href="/gtour"
          className="btn is-md is-raw flex-1 wrapper-sub-product"
          aria-label="تور"
        >
          <div className="a-card badge-wrapper border-0">
            <div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
              <div className="product-image">
                <img
                  src="https://cdn.alibaba.ir/h2/desktop/assets/images/gtour-icon-5e641f1b.svg"
                  alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/gtour-icon-5e641f1b.svg"
                  className="is-responsive is-animated"
                  width={46}
                  height={46}
                />
              </div>
              <span className="text-body-md md:mr-1 text-grays-500">تور</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default OthersService;
