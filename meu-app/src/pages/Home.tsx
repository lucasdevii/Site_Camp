function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex bg-[url('/DesertNight.jpg')] bg-cover bg-center w-full mx-32 h-[22rem] rounded-md mt-16 items-center">
          <div className="bg-transparent flex flex-col justify-center items-center space-y-2 mx-12 w-full">
            <div className="bg-transparent">
              <h2 className="bg-transparent text-2xl font-extrabold text-center">
                Embarque em epicas jornadas!
              </h2>
            </div>
            <p className="bg-transparent text-center text-xs">
              Explore um vasto mundo diverso criado por vc e seus amigos, crie
              seu heroi, monte suas habilidades unicas, e forge sua determinação
              de aço!
            </p>
            <div className="bg-transparent pt-3">
              <button className="px-4 py-3 bg-yellow-700 rounded-xl font-bold hover:bg-orange-900 hover:text-yellow-200 hover:scale-105 duration-150">
                Começar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-32 my-10  space-y-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Principais Recursos</h1>
            <h3 className="text-base my-2">
              Descubra os elementos principais que tornam Mystic Realms uma
              experiência de RPG única e imersiva.
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="px-4 py-5 bg-[#3e362e] border border-[#916d50] rounded-lg h-52">
              <h2 className="font-semibold bg-[#3e362e] text-lg">
                Árvore de Habilidades
              </h2>
              <p className="text-sm bg-[#3e362e] text-[#927b64] mt-1">
                Personalize o crescimento do seu personagem com uma árvore de
                habilidades extensa, permitindo estilos de jogo e construções
                únicas.
              </p>
            </div>

            <div className="px-4 py-5 bg-[#3e362e] border border-[#916d50] rounded-lg h-52">
              <h2 className="font-semibold bg-[#3e362e] text-lg">
                Classes Diversificadas
              </h2>
              <p className="text-sm bg-[#3e362e] text-[#927b64] mt-1">
                Escolha entre uma variedade de classes, cada uma com suas
                próprias forças, fraquezas e habilidades especiais.
              </p>
            </div>

            <div className="px-4 py-5 bg-[#3e362e] border border-[#916d50] rounded-lg h-52">
              <h2 className="font-semibold bg-[#3e362e] text-lg">
                Comunidade Vibrante
              </h2>
              <p className="text-sm bg-[#3e362e] text-[#927b64]  mt-1">
                Participe de uma comunidade ativa de jogadores, compartilhe suas
                aventuras e colabore em missões.
              </p>
            </div>

            <div className="px-4 py-5 bg-[#3e362e] border border-[#916d50] rounded-lg h-52">
              <h2 className="font-semibold bg-[#3e362e] text-lg">
                Crie suas histórias
              </h2>
              <p className="text-sm bg-[#3e362e]  text-[#927b64] mt-1">
                Mergulhe em um mundo com uma história profunda e envolvente,
                repleto de contos, personagens e segredos a serem descobertos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
