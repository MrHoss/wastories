import { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "@renderer/@emotion-custom/Button";
import Box from "@renderer/@emotion-custom/Box";
import Loading from "@renderer/@emotion-custom/Loading";
import { ConnectionContext } from "@renderer/context/ConnectionContext";

const QRCodeRenderer = () => {
  const { sessionData, loading, createSession } = useContext(ConnectionContext);
  return (
    <Box style={{ textAlign: 'center' }}>
      <Box style={{ backgroundColor: sessionData.qrCode ? "#fff" : "transparent", padding: 9, borderRadius: 8, margin: 'auto', width: 272, height: 272 }}>
        {sessionData.qrCode ? (
          <><QRCodeSVG value={sessionData.qrCode} size={256} /></>
        ) :
          <Box style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
            {!loading &&
              <>
                {(sessionData.status === 'close' || !sessionData.id) &&
                  <Button onClick={createSession}>Criar sessão</Button>
                }
              </>
            }
            {loading || sessionData.status === 'connecting' || sessionData.status === 'initializing' &&
              <>
                <Loading />
                <span>{sessionData.status}</span>
              </>
            }


          </Box>
        }
      </Box>
    </Box>
  )
};
export default QRCodeRenderer;