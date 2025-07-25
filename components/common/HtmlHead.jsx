import Head from 'next/head';

const HtmlHead=({urlx,metaData,images})=>{
//const base_url = process.env.NEXT_PUBLIC_BASEURL;
const base_url = (process.env.NEXT_PUBLIC_BASEURL || '').replace(/\/$/, '');
return(
        <Head>
         <title>{metaData?.title ?? "Explore Northeast India:Customized Tours & Travel Packages | Encamp-Adventures"}</title>
         <link rel="icon" src="/favicon.ico" />
         <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
         <meta name="description" content={metaData?.description ?? "Encamp helps people plan, book and travel hassle free. We are a sustainability oriented travel startup and we curate memorable trips and camping experiences for Encampers daily. Would you like Team Encamp to plan your next hassle free travel & adventure experience? Call 🤙 us for: Offbeat Stays | Hassle Free Travel | Thrilling Activities"}/>
         <meta name="keywords" content={metaData?.keywords ?? "Encamp Adventures, Trekking, Camping, Dome Tent Stay, Ziro, Arunachal Pradesh,Assam, Meghalaya,Nagaland,Mizoram,Tripura,Sikkim,Encamp Adventures, Music Festival, Outdoor Adventures, Sustainable Tourism, Carbon Offset"}/>
         <meta property="og:title" content={metaData?.title ?? "Explore Northeast India:Customized Tours & Travel Packages | Encamp-Adventures"}/>
         <meta property="og:description" content={metaData?.description ?? "Encamp helps people plan, book and travel hassle free. We are a sustainability oriented travel startup and we curate memorable trips and camping experiences for Encampers daily. Would you like Team Encamp to plan your next hassle free travel & adventure experience? Call 🤙 us for: Offbeat Stays | Hassle Free Travel | Thrilling Activities"}/>
         <link rel="icon" src="/favicon.ico"/>
         <meta property="og:image" content={images?.[0] ?? `https://encamp-media-files.s3.ap-south-1.amazonaws.com/WariChora.jpg`}/>
         <meta property="og:url" content={`${base_url}${urlx ?? ''}`}/>
         <link rel="canonical" href={`${base_url}${urlx ?? ''}`}/>
        </Head>
	)

}
export default HtmlHead;
