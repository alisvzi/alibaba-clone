const ServicesCard = () => {
  return (
    <>
      <div className="flex items-center justify-between flex-wrap mb-4">
        <div className="w-[590px] h-[244.5px] rounded-lg border border-border overflow-hidden">
          <img
            src={
              "https://cdn.alibaba.ir/cms/uploads/AL_Digitalmarketing_on_going_Safar_Card_Cardview_Banner_Desktop_03_10_29_84e3e680f4.webp"
            }
            alt="servis1"
            width={590}
            className=""
          />
        </div>
        <div className="w-[590px] h-[244.5px] rounded-lg border border-border overflow-hidden">
          <img
            src={
              "https://cdn.alibaba.ir/cms/uploads/AL_Digitalmarketing_ongoing_Installmentpurchase_Cardview_Banner_Desktop_04_0_3_13_20a96cb7f0.webp"
            }
            alt="servis1"
            width={590}
            className=""
          />
        </div>
      </div>
      <div className="border border-border rounded-lg px-16 pt-2 overflow-hidden flex w-full flex-wrap items-center justify-center relative gap-x-8">
        <img
          src="https://cdn.alibaba.ir/h2/desktop/assets/images/app-mobile/qrcode-56155e39.png"
          alt="بارکد دانلود اپلیکیشن علی بابا"
          className=""
          width={148}
          height={185}
          style={{ marginLeft: 0 }}
        />
        <div
          className="pl-12 whitespace-nowrap"
          style={{ flex: "0 0 0%", marginLeft: 0 }}
        >
          <p className="text-6 text-grays-600 font-black mb-0">
            {" "}
            اپلیکیشن علی‌بابا{" "}
          </p>
          <span className="text-5 font-medium">
            {" "}
            سریع‌تر و مطمئن‌تر به سفر بروید{" "}
          </span>
          <div className="flex w-full items-stretch py-5">
            <div
              className="mr-2 text-secondary-400"
              style={{ flex: "0 1 50%" }}
            >
              <span className="h-full inline-flex items-center py-2 pl-7 cursor-pointer text-primary">
                مشاهده لینک های دانلود
                <svg
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M16.698 21.266a.75.75 0 0 1-1.08 1.037l-.066-.069-8.25-9.75a.75.75 0 0 1-.058-.89l.058-.078 8.25-9.75a.75.75 0 0 1 1.202.893l-.056.075L8.858 12l7.84 9.266Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <span className="flex items-end text-grays-300 text-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAALVBMVEVHcEzJ0Nq/x82/x83Ax83Ey9K/x83Ayc6/x82/x82/x82/x83AyM3Cys6+xswvwGblAAAADnRSTlMACu+yYRZyON3EooVNJ2sjt+sAAAEuSURBVDjLY2BAAVWtDFhB8LunWMV59d4pYJUIevduAlYJu3fvHLCJs79790gAmwTXu3fPsJrE9O6dAVaJuHePsZrEcO+FA3bvhRQwEA8YawrBtEyaO4q4SN+7d1MEGBid3717p4VkII/eO5CIyyIQ9e4Vwmn73qEAeNBzo4q/ewnTcg5dIgAizqqHJmEI1cCGyyQONAlVBhxWJOBw7DsBpAhFBo/h3utDlXgNl0Bz7TOSJV7jsgNh+TxUCUTSWofmD3iKyEOTaIRJ1KFJvIJJyKFJvNsAlWBGl3gFjSgWdIl3OtA0hR6D757jcO+7BlhifocjqtBth/udF03iCa6UiMi5EqgmXUDO+FhjioHBD1kCOYNyY0uI8KA3qa0BZRBT1ELBSDMVFDrOHVOgIgDdWvhBf9f4lgAAAABJRU5ErkJggg=="
              alt="ios logo"
              className="is-responsive is-animated ml-2 mb-1"
              width={20}
              height={20}
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAKlBMVEVHcEy/x87CzM2/x83O09bByc/AyM6/x82/x82/x82/x83AyM7Ax82+xswqLt8wAAAADXRSTlMAdhjeBi1L78CulV+HMiPrHwAAAPlJREFUOMtjYBgFpAA24wTsfOa7RSgS6ncNYBK3UCTWwiQY794NQBJnvXtXAMJisb3bgCTBcfeyA5SZe/caUDpso3SqA4yHUJPTexcIbhxF0Q80dfJdKDB0RLZx7V0EKEd2Y+5dZIDwFSOK+N0JMHGWuagSN2Gu9biLBlqgEr3oElAtXHcxwAKwxF5MidsgcaZaTInrCkAJzrtYAMjFsSCGkCJMCMK6CpQAeeIiA4MsRBzKugkOwLt3LzEw6EIkYKwABh7sEgeAEY7NKGCsx97FZjnQ9r13sYLbKHGEBG5hhiAE3GCwxS5xmaEWu8R1hrs4AG4dOCXoAAAsa7wb0fLE0wAAAABJRU5ErkJggg=="
              alt="android logo"
              className="is-responsive is-animated ml-2 mb-1"
              width={20}
              height={20}
            />
            <span>قابلیت نصب روی Android و iOS</span>
          </span>
        </div>
        <img
          src="https://cdn.alibaba.ir/h2/desktop/assets/images/app-mobile/app-mobile-travels-lg-34ce5db4.webp"
          alt="application screenshot"
          className="is-responsive is-animated shrink-0 self-end mr-auto"
          width={334}
          height={294}
        />
      </div>
    </>
  );
};

export default ServicesCard;
