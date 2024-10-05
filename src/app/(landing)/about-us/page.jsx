import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 grid w-full gap-0">
        <div className="absolute inset-0 w-full">
          <Image
            alt="Hero"
            className="object-cover"
            // height="600"
            // width="1440"
            fill
            src="/slider-01.jpg"
            // style={{
            //   aspectRatio: "1440/400",
            //   objectFit: "cover",
            // }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative grid w-full text-center pt-12 pb-4 px-4 space-y-2 lg:pt-24 lg:space-y-4 gap-5">
          <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-100">
            About Us
          </h1>
          <p className="text-gray-300">
            Learn more about our mission, history, and the people behind Tech
            Innovators
          </p>
        </div>
      </div>
      <div className="relative w-full mt-12 lg:mt-24">
        <div className="container grid max-w-5xl gap-10 px-4 py-8 space-y-0 lg:grid-cols-3 lg:gap-10 lg:space-y-10 lg:py-12">
          <div className="flex flex-col gap-2 lg:col-span-2 lg:gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Our Journey
              </h2>
              <p className="max-w-prose text-gray-500 md:text-xl dark:text-gray-400">
                A journey of a thousand miles begin with a single step and we
                have started in journey. Actually it&apos;s an honour for me and
                for my team to introduce Shri guro mangal sarvanjna hospital
                shyampur situated in rural area but committed to offer high
                quality health care services. we would like to extend our
                warmest welcomes and sincere greetings to you. With the goal of
                demonstrating our concern and commitment to our patients
                physical, mental and spiritual to achieve this we have brought
                allopathy, naturopathy, yoga & meditation all together.
              </p>
            </div>
            <div className="space-y-8 lg:space-y-0">
              <p className="text-justify mt-5">
                The SGM Sarvanjna Hospital provides high quotient of quality
                health care & commitment, which is backed up by a well trained
                and dedicated hospital staff. It&apos;s a multispeciality
                hospital through which we are trying our best to give multiple
                services, multiple facilities with the quality of work more than
                a treatment, more than a hospital. Our specialist doctors work
                hard and with ultimate dedication and humanity towards the
                service of the mankind. we work hard to acquire newer knowledge
                abilities and update ourselves to keep up with the latest
                developments in the area. we hope you will take advantage of our
                services and that you will enjoy your visit to our hospital. And
                as I told in the beginning it is the first step which is bound
                to cover thousand miles of journey. As a director and as a
                determind mind I have lot of dreams, lot of plannings and lots
                of commitments not only for the society but for myself too.
                Since I believe more in work then words I shall complete it with
                this phrase which always sounds and sounds in my heart:&nbsp;
                <span className="font-semibold italic">
                  woods are lovely dark and deep but I have promises to keep,
                  and miles to go before I sleep, and miles to go before I
                  sleep.
                </span>
              </p>
              {/* <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">2015</h3>
                  <p>
                    Launched our first mobile app, reaching over 10K downloads
                    in the first month.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">2017</h3>
                  <p>
                    Expanded our operations globally, opening new offices in
                    Europe and Asia.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">2019</h3>
                  <p>
                    Received the Innovation Award at the annual Tech Summit for
                    our work in AI and machine learning.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">2022</h3>
                  <p>
                    Introduced our flagship product, the TI-9000, a
                    next-generation smart home device.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="mx-auto max-w-[600px] space-y-4 lg:col-start-3 lg:space-y-6">
            <Image
              alt="Team"
              className="aspect-video overflow-hidden rounded-xl object-bottom"
              height="400"
              width="600"
              src="/slider-02.jpg"
            />
          </div>
          <p className="max-w-prose md:max-w-full text-gray-500 md:text-xl dark:text-gray-400"></p>
        </div>
      </div>
    </>
  );
}

// export const metadata = {
//   title: "About Us || Sarvanjana Hospital, Rishikesh",
//   description:
//     "The SGM Sarvanjna Hospital, a multispeciality hospital provides high quotient of quality health care & commitment, which is backed up by a well trained and dedicated hospital staff.",
// };
